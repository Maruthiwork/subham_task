import { error as serror } from '@sveltejs/kit';
import { fetchAllDistrict, fetchPostOfficeByName, fetchPostOffices, fetchRightBarData, fetchTrendingStories } from '../../api/fetchData';
import { reverseSlug } from '$lib/components/utils/utils';
import { logErrorTodb } from '../../api/postData';

export async function load(props) {
    const { locals,params }: any = props;
    const requestHeader = props.request.headers.get('host') || '';
    const { deviceType, language } = locals;
    const { slug } = params;

    let slugArray = slug.split('/')
    let state = slugArray?.[0];
    let district = slugArray?.[1];
    let office = slugArray?.[2];
    let stateCalled = district ? false : true;
    let stateResponsePromise = null,districtResponsePromise = null,officeResponsePromise = null;
    
    if(state && stateCalled){
        stateResponsePromise = fetchAllDistrict(language,reverseSlug(state));
    }
    if(district){
        districtResponsePromise = fetchPostOffices(language,reverseSlug(district),reverseSlug(state));
    }

    if (office) {
        // First, fetch district data if not already being fetched
        if (!districtResponsePromise) {
            districtResponsePromise = fetchPostOffices(language, reverseSlug(district), reverseSlug(state));
        }
        // After fetching the district data, fetch the office data by name
        officeResponsePromise = fetchPostOfficeByName(language, reverseSlug(office),reverseSlug(district));
    }
    


  

    try {
        const [allDistrict,allPostOffice,officeDetails,trending,rightSideBar] = await Promise.all([
            stateResponsePromise,
            districtResponsePromise,
            officeResponsePromise,
            fetchTrendingStories(language),
            fetchRightBarData(language)
        ].map(p => p || Promise.resolve(null)));

   
        


        return {
            props: {
                allDistrict: allDistrict?.data?.data,
                postOffice: allPostOffice?.data?.data,
                officeDetails: officeDetails ? officeDetails?.data?.data : null,
                trending_stories: trending ? trending.data : null,
                rightSideBar : rightSideBar ? rightSideBar?.data?.data : null,
                slug:slug,
                device:deviceType,
                language:language,
                envDetails: locals.ENV_DETAILS
            },
        };
    } catch (error:any) {
        if (error?.location == "/404") {
            await logErrorTodb({
                url:props?.url?.href,
                deviceType,
                requestHeader,
                language,
            });
            throw serror(404, { message: "PAGE NOT FOUND" });
        } 

    }
}

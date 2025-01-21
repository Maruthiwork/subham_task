<script lang="ts">
    import SEO from "$lib/components/SEO/index.svelte";

    export let isAmp: boolean = false;
    export let canonicalUrl = "";
    export let envDetails: any = {};
    export let siteNavigation: any = [];

    let homeText = "";

    if (envDetails?.language === "H") {
        homeText = "Hindi News";
    } else {
        homeText = "News";
    }
</script>

<SEO
    {isAmp}
    title={`Policies Disclaimers - Latest Terms, Conditions, and Terms of Service`}
    metadescription={"Discover the latest updates & changes in Terms & Conditions of Republicworld.com. Explore detailed information on Policies Disclaimers, Terms, Conditions, and Terms of Service of SARG Global Digital Private Ltd"}
    keywords={`Policies Disclaimers, Terms & Conditions, T&C, Terms of use, Terms, Conditions, Terms of Service, T&C Republic World, Terms & Condition Republic World, Terms of Use Republic World, Terms of Service Republic World`}
    {canonicalUrl}
    site_details={envDetails}
    pathname={"/policies-disclaimers"}
    {siteNavigation}
/>

<div class="contentWrapper">
    <div class="regularPage">
        <div class="breadcrumb my-6">
            <ul>
                <li class="p-4">
                    <a href="/">{homeText} /</a>
                    <a>Policies-Disclaimers</a>
                </li>
            </ul>
        </div>
        <div class="pageContent">
            <h2>Policies and Disclaimers</h2>
            <p>
                {`SARG Global Digital Private Ltd is the sole and absolute owner of & maintains republicworld.
                        com and other mobile applications (Apps) (hereinafter "Website") to enhance public access to the
                        Republic TV content owned by its Holding Company ARG Outlier Media Pvt. Ltd.`}
            </p>
            <p>
                {`SARG Global Dil Private Ltd requires that all users/visitors to this site(s) on the World Wide
                        Web (the "Site") adhere to these Terms & Conditions [T&C] & Rules & Regulations [R&R].`}
            </p>
            <p>
                {`By accessing this Site you/user/visitor automatically confirm your acknowledgment & acceptance
                        of these T&C & R&R which is the agreement between the parties.`}
            </p>
            <h2>
                {`Copyright/Trademarks [Collectively "Intellectual Property Rights"]`}
            </h2>
            <p>
                {` The trademarks, logos & service marks ("Marks") displayed on the Site are the property of SARG
                        Global Digital Private Ltd & other parties. Users are prohibited from using any Marks for any
                        purpose including, but not limited to use as metatags on other pages or sites on the World Wide
                        Web without the written permission of SARG Global Digital Private Ltd or such third party which
                        may own the Marks. All information & content including any software programs available on or
                        through the Site ("Content") is protected by copyright. Users are prohibited from modifying,
                        copying, distributing, transmitting, displaying, publishing, selling, licensing, creating
                        derivative works or using any Content available on or through the Site for commercial or public
                        purposes.`}
            </p>
            <p>
                {`  SARG Global Digital Private Ltd grants you a limited licence to access and make personal use of
                        this site but not for commercial purposes. We permit the use of materials on this website
                        subject to due credit is given to SARG Global Digital Private Ltd . The use shall also be
                        subject to non-commercial use and limited to personal or academic dissemination. (including on
                        social media and use on all kinds of media). Copyright should be acknowledged. Such use should
                        not infringe on the Intellectual Property Rights of any person. When using material on this
                        website, proper attribution to authors and/or copyright holders must be given. User is granted a
                        limited, revocable and non exclusive right to create hyperlinks to the home page or any other
                        page of Website so long as any of these links do not portray SARG Global Digital Private Ltd or
                        their podcast or products or services in a false, misleading, derogatory or offensive manner.
                        You may not use Website logos or proprietary graphics or trademarks as part of the link without
                        express permission.`}
            </p>
            <h2>{`General Conditions of Website Use`}</h2>
            <p>
                {` If any user chooses to use the Website or its related mobile sites and applications or any of
                        the features of this site, including but not limited to API, software and other downloads
                        (collectively, the "Services"), then the user will be agreeing to abide by all of the terms and
                        conditions of these Terms of Service between stipulated by SARG Global Digital Private Ltd`}
            </p>
            <p>
                {` SARG Global Digital Private Ltd may change, add or remove portions of these Terms of Service at
                        any time, which shall become effective immediately upon posting. It is the users responsibility
                        to review these Terms of Service prior to each use of the Site and by continuing to use this
                        Site, it is deemd that the users agree to any or all changes.`}
            </p>
            <p>
                {`  IF ANY OF THESE RULES OR ANY FUTURE CHANGES ARE UNACCEPTABLE TO YOU, YOU MAY CANCEL YOUR
                        MEMBERSHIP BY SENDING E-MAIL TO: unsubscribe@republic.com(SEE SECTION REGARDING TERMINATION OF
                        SERVICE). YOUR CONTINUED USE OF THE SERVICES NOW, OR FOLLOWING THE POSTING OF NOTICE OF ANY
                        CHANGES IN THESE OPERATING RULES, WILL INDICATE ACCEPTANCE BY YOU OF SUCH RULES, CHANGES, OR
                        MODIFICATIONS.`}
            </p>
            <p>
                {` SARG Global Digital Private Ltd may change, suspend or discontinue any aspect of the Services at
                        any time, including the availability of any Services feature, database, or content. SARG Global
                        Digital Pvt Ltd. may also impose limits on certain features and services or restrict user access
                        to parts or all of the Services without notice or liability.`}
            </p>
            <p>
                {` The contents of the Website and Services are for personal, non-commercial use. All materials
                        published or displayed in the Website including but not limited to articles, essays,
                        photographs, videos, stories etc., are copyright belonging to or licensed to SARG Global Digital
                        Private Ltd.`}
            </p>
            <p>
                {`  User may download or copy the content or any part thereof for personal use only. Copying or
                        storing the content in this Website for other than personal purposes are expressly forbidden
                        unless a written permission is obtained from SARG Global Digital Private Ltd.`}
            </p>
            <p>
                {` Certain content in this Website may be provided by third party providers under license and SARG
                        Global Digital Pvt Ltd, is not and shall not be responsible for its accuracy, errors, omissions
                        in any such content or any time delay in the same being available`}
            </p>
            <p>
                {`  SARG Global Digital Private Ltd grants you a limited licence to access and make personal use of
                        this site but not for commercial purposes. We permit the use of materials on this website
                        subject to due credit is given to SARG Global Digital Private Ltd . The use shall also be
                        subject to non-commercial use and limited to personal or academic dissemination. (including on
                        social media and use on all kinds of media). Copyright should be acknowledged. Such use should
                        not infringe on the Intellectual Property Rights of any person. When using material on this
                        website, proper attribution to authors and/or copyright holders must be given. User is granted a
                        limited, revocable and non exclusive right to create hyperlinks to the home page or any other
                        page of Website so long as any of these links do not portray SARG Global Digital Private Ltd or
                        their podcast or products or services in a false, misleading, derogatory or offensive manner.
                        You may not use Website logos or proprietary graphics or trademarks as part of the link without
                        express permission.`}
            </p>
            <h2>{`No Warranties`}</h2>
            <p>
                {` ALL CONTENT ON THE SITE IS PROVIDED TO YOU "AS IS" WITHOUT WARRANTY OF ANY KIND EITHER EXPRESS
                        OR IMPLIED INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY & FITNESS
                        FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, SECURITY OR ACCURACY. SARG Global Digital
                        Private Ltd DOES NOT ENDORSE & IS NOT RESPONSIBLE FOR THE ACCURACY OR RELIABILITY OF ANY
                        OPINION, ADVICE OR STATEMENT MADE THROUGH THE SITE BY ANY PARTY OTHER THAN SARG Global Digital
                        Private Ltd . OTHER THAN AS REQUIRED UNDER APPLICABLE LAW, UNDER NO CIRCUMSTANCE WILL SARG
                        Global Digital Private Ltd BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A USER'S RELIANCE ON
                        INFORMATION OBTAINED THROUGH THE SITE. IT IS THE RESPONSIBILITY OF THE USER TO EVALUATE THE
                        ACCURACY, COMPLETENESS OR USEFULNESS OF ANY OPINION, ADVICE OR OTHER CONTENT AVAILABLE
                        ON/THROUGH THE SITE. PLEASE SEEK THE ADVICE OF PROFESSIONALS, AS APPROPRIATE, REGARDING THE
                        EVALUATION OF ANY SPECIFIC OPINION, ADVICE OR OTHER CONTENT.`}
            </p>
            <h2>{`Limitation Of Liability`}</h2>
            <p>
                {`  SARG Global Digital Private Ltd specifically disclaims any liability (whether based in contract,
                        tort, strict liability or otherwise) for any direct, indirect, incidental, consequential, or
                        special damages arising out of or in any way connected with access to or use of the Site, (even
                        if SARG Global Digital Private Ltd has been advised of the possibility of such damages)
                        including liability associated with any viruses which may infect a user's computer equipment.`}
            </p>
            <h2>{` Privacy`}</h2>
            <p>
                {`Users are invited to submit comments, questions, ideas, reviews or any other information
                        concerning SARG Global Digital Private Ltd and the website's contents, provided they understand
                        that such comments will be subject to moderation & SARG Global Digital Private Ltd reserves the
                        right to remove or edit such content. All such submissions should not be illegal, obscene,
                        threatening, defamatory or infringing on privacy or on intellectual property rights of others.`}
            </p>
            <h2>{`Linked Internet Sites`}</h2>
            <p>
                {` SARG Global Digital Private Ltd prohibits caching, unauthorized hypertext links to the Site &
                        the framing of any Content available through the Site. SARG Global Digital Private Ltd reserves
                        the right to disable any unauthorized links or frames & specifically disclaims any
                        responsibility for the Content available on any other Internet sites linked to the Site. Access
                        to any other Internet sites linked to the Site is at the user's own risk.`}
            </p>
            <h2>{`Confidentiality Of User Communications`}</h2>
            <p>
                {`Except as required by law SARG Global Digital Private Ltd will maintain the confidentiality of
                        all user communications which contain personal user information & which are transmitted directly
                        to Website. Postings by a user on any message board or in any chat room will not be protected as
                        confidential & Website may use & provide information contained in any such postings (including
                        any ideas, concepts, know-how or other intellectual property) to SARG Global Digital Private Ltd
                        for any purpose whatsoever & as deemed appropriate by SARG Global Digital Private Ltd.`}
            </p>
            <h2>{`Postings`}</h2>
            <p>
                {` SARG Global Digital Private Ltd is under no obligation to review any messages, information or
                        content ("Postings") posted on the Site by users & assumes no responsibility or liability
                        relating to any such Postings. Notwithstanding the above, SARG Global Digital Private Ltd may
                        from time to time monitor the Postings on the Site & may decline to accept and/or remove any
                        Postings that contain any unlawful, harmful, threatening, abusive, harassing, defamatory,
                        vulgar, obscene, profane, hateful, racially, ethnically or otherwise objectionable material of
                        any kind, including, but not limited to, any material which encourages conduct that would
                        constitute a criminal offense, give rise to civil liability or otherwise violate any applicable
                        local, state, national or international law.`}
            </p>
            <p>
                {`Users are prohibited from uploading or posting any content which contain information that is: -`}
            </p>
            <ol type="1">
                <li>
                    {`Libelous / Defamatory/ obscene/ pornographic/ abusive/ illegal`}
                </li>
                <li>{`Advertisements or solicitations of any kind.`}</li>
                <li>{`Messages posted by users impersonating others.`}</li>
                <li>
                    {`Personal information such as messages which state phone numbers, social security numbers,
                            account numbers, addresses, or employer references.`}
                </li>
                <li>
                    {`Messages by non-spokesperson employees of SARG Global Digital Private Ltd purporting to
                            speak on behalf of SARG Global Digital Private Ltd`}
                </li>
                <li>
                    {` Messages that offer unauthorized downloads of any copyrighted or private information.
                            Multiple messages placed within individual folders by the same user restating the same
                            point.`}
                </li>
                <li>{`Chain letters /mails of any kind.`}</li>
            </ol>
            <p>
                {` Any submission that the user makes i.e user generated content including and not limited to
                        comments, text, video, audio, photographs and the like may be edited, modified, transmitted,
                        removed, published, displayed etc by SARG Global Digital Pvt. Ltd. and the user hereby waives
                        any or all rights they may have including no objection to the edited material if the said
                        changes are not agreeable to the user. Further, the submissions may be used by the Website.`}
            </p>
            <p>
                {` Any submission made by any user in the Website comes with the implicit commitment of no
                        objection for the said content being displayed or published with modifications or moderation as
                        decided by SARG Global Digital Pvt Ltd.`}
            </p>
            <h2>{`Changes To Rules & Regulations (R & R)`}</h2>
            <p>
                {` We reserve the right to revise these R & R at any time & Users are deemed to be apprised of &
                        bound by any changes to these R & R. The latest updated R & R would be posted on the Site.`}
            </p>
            <h2>{`Violation Of Rules & Regulations`}</h2>
            <p>
                {` SARG Global Digital Private Ltd reserves the right to seek all remedies available at law & in
                        equity for violations of these T&C & R&R, including the right to block access from a particular
                        Internet address to the Site.`}
            </p>
            <h2>{`Access To Password Protected/Secure Areas`}</h2>
            <p>
                {` Access to & use of password protected and/or secure areas of the Site is restricted to
                        authorized users only. Unauthorized individuals attempting to access these areas of the Site may
                        be subject to prosecution.`}
            </p>
            <h2>{`Arbitration`}</h2>
            <p>
                {` Any dispute arising out of or in connection with this agreement, including any question
                        regarding its existence, amendment, validity or termination, shall be referred to & finally
                        resolved by arbitration in accordance with the Indian Arbitration & Conciliation Act, 1996. The
                        arbitration shall be a "documents only", evidence through affidavits "fast track" arbitration.
                        The Tribunal shall consist of one (1) arbitrator to be appointed by SARG Global Digital Private
                        Ltd . The exclusive seats of arbitration shall be Chennai, India & the language of the
                        arbitration shall be English.`}
            </p>
            <h2>{`Governing Law`}</h2>
            <p>
                {`This agreement shall be governed by & construed in accordance with the laws of India. User
                        access to & use of the Site is subject to all applicable laws.`}
            </p>
            <h2>{`Jurisdiction`}</h2>
            <p>
                {`In respect of all matters/disputes arising out of, in connection with or in relation to this
                        agreement, only the civil courts at Mumbai, India shall have jurisdiction, to the exclusion of
                        all other courts.`}
            </p>
            <h2>{`Publication`}</h2>
            <p>
                {`  The Web site is deemed to be published from/at Mumbai, India (irrespective of where it is
                        accessed from).`}
            </p>
            <p>
                {` Any matter, dispute, resolution on the presents are subject to the exclusive jurisdiction of
                        Mumbai Court only.`}
            </p>
            <ul>
                <li>
                    All communications and notices of any kind may be sent to:
                </li>
                <li>SARG Global Digital Private Ltd ,</li>
                <li>Republic TV,</li>
                <li>Bombay Dyeing Mill compound</li>
                <li>Wadia International Centre,</li>
                <li>Pandurang Budhkar Marg,</li>
                <li>Lower Parel,</li>
                <li>Mumbai - 400025</li>
            </ul>
        </div>
    </div>
</div>

<style>
    .pageContent p {
        font-size: var(--font20);
        margin-bottom: 35px;
        line-height: 1.4;
        font-weight: 400;
    }
    .pageContent ol {
        padding-left: 20px;
    }

    .pageContent ol li {
        list-style-type: block;
    }
    .pageContent li {
        padding-bottom: 10px;
    }

    .pageContent h2 {
        margin-bottom: 16px;
        line-height: 1.1;
        letter-spacing: -0.5px;
        font-weight: 900;
    }
</style>

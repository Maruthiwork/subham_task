<script lang="ts">
  import { ConvertDateFormat } from "$lib/components/utils/utils";
  import likeActive from "$lib/assets/images/like-active.svg";
  import likeInActive from "$lib/assets/images/like-inactive.svg";
  import dislikeActive from "$lib/assets/images/dislike-active.svg";
  import dislikeInActive from "$lib/assets/images/dislike-inactive.svg";
  import commentIcon from "$lib/assets/images/comment.svg";
  import { ContentType } from "$lib/components/enums/story";
  import { postComment } from "../../../../routes/api/postData";
  import ReplyCommentCard from "../ReplyCommentCard/ReplyCommentCard.svelte";

  export let key;
  export let item: any;
  export let ref_id:string;
  export let repliedComments: any;
  export let allow_comment: boolean;
  let reply: boolean = false;
  let liked: boolean = false;
  let disliked: boolean = false;
  let likeCount: boolean = item.likeCount;
  let dislikeCount: boolean = item.disLikeCount;
  let commentPosted: boolean = false;
  let replyCommentData: string = '';
  let comment: string = '';
  let commentReplied: string = '';
  export let language = 'E';


  const replyCommentHandler = async (event: SubmitEvent) => {
    event.preventDefault();
    
    let payload = {
      lang: "E",
      contentType: ContentType.STORY,
      referenceId: ref_id,
      comment: replyCommentData,
      userId: "65223ae72f0c5f7d66293993",
      isDeleted: "false",
      parentId: item._id,
      grandParent: item._id,
    };
    try {
      let res = await postComment(payload,language);
      commentPosted = true;
      comment = '';
      commentReplied = replyCommentData;

    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const replyCommentChange = (e:any) => {
    replyCommentData = e.target.value;
  };

</script>

<div class="topCommentlistItem">
  <h4>
    <strong>
      {item?.user_info?.fullName ? item?.user_info?.fullName : "User"}
    </strong>
    | {ConvertDateFormat(item?.createdAt)}
  </h4>
  <p>{item?.comment}</p>
  <ul class="commentReact">
    {#if allow_comment}
      <li>
        <a
          class="cursorPointer"
          on:click={(e) => {
            e.preventDefault();
            reply = !reply;
          }}
        >
          <i class="replyIcon"></i>
        </a>
      </li>
    {/if}
    <li>
      <a
        class="cursorPointer"
        on:click={(e) => {
          e.preventDefault();
          if (!liked) {
            // likeAndDislikeComment(item?._id, true);
          }
        }}
      >
        {likeCount}
        {#if liked}
          <span class="mar64"
            >
            <img alt="Like Active Icon" src={likeActive} decoding="async"height="24px"width="23px"loading="lazy"/>
            </span
          >
        {:else}
          <span class="mar64"
            >
            <img alt="Like In Active Icon" src={likeInActive} decoding="async"height="24px"width="23px"loading="lazy"/>
            </span
          >
        {/if}
      </a>
    </li>
    <li>
      <a
        class="cursorPointer"
        on:click={(e) => {
          e.preventDefault();
          if (!disliked) {
            // likeAndDislikeComment(item?._id, false);
          }
        }}
      >
        {dislikeCount}
        {#if disliked}
          <span class="mar64"
            >
            <img alt="DisLike Active Icon" src={dislikeActive} decoding="async"height="24px"width="23px"loading="lazy"/>
      
            </span
          >
        {:else}
          <span class="mar64"
            >
            <img alt="DisLike In Active Icon" src={dislikeInActive} decoding="async"height="24px"width="23px"loading="lazy"/>
            </span
          >
        {/if}
      </a>
    </li>
  </ul>
  {#if reply}
      <div class="commentForm">
        {#if !commentPosted}
        <form on:submit={replyCommentHandler}>
          <textarea
            placeholder="Reply to this comment"
            bind:value={comment}
            on:input={(e) => replyCommentChange(e)}
          />
          <input
            type="submit"
            class="submitBtn solidBtn warmRed cursorPointer"
            value="Submit Reply"
          />
        </form>
      {/if}      
      </div>
    {/if}
  
    {#if commentPosted}
      <div class="topComment">
        <h3>
          <img src={commentIcon} alt="" /> Your comment reply is under review
        </h3>
        <div class="topCommentlist">
          <div class="topCommentlistItem">
            <p>{commentReplied}</p>
          </div>
        </div>
      </div>
    {/if}
  
    {#if repliedComments}
    {#each repliedComments as item, idx}
    {#if Object.keys(item).length !== 0}
      <ReplyCommentCard key={idx} item={item} idx={idx} />
    {/if}
  {/each}
  

    {/if}
</div>

<style>
  .replyIcon{
    background: url("../../../assets/images/reply.svg") no-repeat center center;
    width: 52px;
    height: 32px;
    background-size: contain;
}
  .topCommentlistItem {
    border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    padding: 16px 8px;
    transition: all 0.3s ease;
  }
  .topCommentlistItem:hover {
    background: #ffeaea;
  }
  .topCommentlistItem:last-child {
    border-bottom: 0;
  }
  .topCommentlistItem h4 {
    font-size: var(--font18);
    color: #303030;
    font-weight: 600;
    padding-bottom: 12px;
  }
  .topCommentlistItem h4 strong {
    font-weight: 700;
  }
  .topCommentlistItem p {
    font-size: var(--font20);
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
  }

  .topCommentlistItem p.commenBeing {
    font-size: var(--font16);
    padding-top: 10px;
  }
  .topCommentlistItem p.commenBeing.bold {
    font-size: var(--font20);
    font-weight: 900;
    letter-spacing: -0.25px;
  }
  .topCommentlistItem .topCommentlistItem {
    padding-left: 18px;
    padding-bottom: 0;
    padding-right: 0;
    padding-top: 32px;
  }
  .topCommentlistItem .viewMorereply {
    display: inline-block;
    vertical-align: top;
    margin-left: auto;
    font-size: var(--font16);
    font-weight: 500;
    color: rgba(0, 0, 0, 0.72);
    text-decoration: underline;
    margin-top: 20px;
  }
  .cursorPointer {
    cursor: pointer;
}
.commentForm{
    padding-top: 24px;
}
.commentForm textarea{
    width: 100%;
    height: 106px;
    background: var(--white);
    border-radius: 0;
    border: 1px solid #f3f3f3;
    box-shadow: none;
    font-size: var(--font20);
    font-weight: 400;
    padding: 8px;
    margin: 0;
    resize: none;
}
.commentForm textarea:focus{
    border-color: var(--black);
}
.commentForm .submitBtn{
    display: block;
    margin-top: 10px;
    margin-left: auto;
}
  .commentReact {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 12px;
}

.commentReact li {
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0 15px;
  display: flex;
  align-items: center;
  min-height: 32px;
}

.commentReact li:last-child {
  border: none;
  padding-right: 0;
}

.commentReact li a {
  display: flex;
  align-items: center;
}

.commentReact li a .likeIcon,
.commentReact li a .dislikeIcon {
  margin-left: 4px;
}

  @media screen and (max-width: 575px) {
    .topCommentlistItem h4 {
      font-size: var(--font14);
    }
    .commentForm textarea{
        height: 80px;
        font-size: var(--font14);
    }
    .commentForm .submitBtn{
        margin-top: 7px;
        font-size: var(--font14);
        padding: 5px 14px;
    }
    .topCommentlistItem p {
      font-size: var(--font16);
    }
    .topCommentlistItem {
      padding: 16px 5px;
    }
    .topCommentlistItem p.commenBeing.bold {
      font-size: var(--font14);
    }
    .topCommentlistItem p.commenBeing {
      font-size: var(--font14);
    }
    .topCommentlistItem .viewMorereply {
      font-size: var(--font12);
      margin-top: 12px;
    }
    .topCommentlistItem .topCommentlistItem {
      padding-top: 28px;
    }
    .commentReact li {
    padding: 0 12px;
    min-height: 24px;
  }

  .commentReact li a {
    font-size: 12px;
  }
  }
</style>

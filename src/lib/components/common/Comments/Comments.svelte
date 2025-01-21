

<style>
  @media screen and (max-width: 1200px) {
    .commentModalwraper {
      max-width: 100%;
      padding: 32px;
    }
  }

  .commentModalwraper {
    max-width: 880px;
    background: #ffd8d8;
    margin: 0 auto;
    padding: 16px 12px;
  }

  .commentHead h3,
  .commentHead p {
    line-height: 1.4;
  }

  .commentHead h3 {
    display: flex;
    align-items: center;
    font-size: var(--font28);
    letter-spacing: -2px;
    font-weight: 900;
    padding-bottom: 16px;
  }

  .commentHead p {
    font-size: var(--font20);
    font-weight: 400;
  }

  .commentForm {
    padding-top: 24px;
  }

  .commentForm textarea {
    width: 100%;
    height: 106px;
    background: white;
    border-radius: 0;
    border: 1px solid #f3f3f3;
    box-shadow: none;
    font-size: 20px;
    font-weight: 400;
    padding: 8px;
    margin: 0;
    resize: none;
    background: white;
  }

  .commentForm .submitBtn {
    display: block;
    margin-top: 10px;
    margin-left: auto;
  }

  .topComment {
    padding-top: 24px;
  }

  .topComment h3 {
    font-size: 22px; /* For desktop */
    letter-spacing: -0.5px;
    font-weight: 900;
    padding-bottom: 4px;
  }

  .topComment img {
    display: block;
    margin-right: 6px;
    width: 24px;
  }

  .topComment .viewMorecomment span {
    animation: none;
    opacity: 1;
    right: 0 !important;
  }

  @media (max-width: 768px) {
    .topComment h3 {
      font-size: 18px; /* For mobile */
    }

    .topComment .viewMorecomment {
      font-size: 14px; /* For mobile */
      padding: 5px 6px;
    }
  }
  .solidBtn {
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    padding: 8px 28px 8px 16px;
    display: inline-block;
    transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
    font-size: 16px;
    line-height: 1;
    font-weight: 600;
    position: relative;
  }
</style>

import { css } from "lit";

const style = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;
    list-style: none;
    border: none;
    text-decoration: none;
  }

  /* CHAT BUBBLE */
  #chatBub {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
    background-color: #011935;
    /* color: #fff; */
    border-radius: 50%;
    position: fixed;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease;
  }

  #chatBub:hover {
    transform: scale(1.1);
    box-shadow: 1px 1px 3.5px 2px rgba(0, 0, 0, 0.4);
    background: #FF7B1D;
  }

  /* CHAT WINDOW */
  #chatWin {
    /* width: 0px;
    height: 0px; */
    border-radius: 30px 30px 0px 30px;
    background: #000;
    position: absolute;
    bottom: 80px;
    right: 10px;
    overflow: hidden;
    /* box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25); */
  }

   /* Welcome User Styles */
  #chatWin .welcome {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  #chatWin .welcome .bg {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #chatWin .welcome .bg .topBlue {
    width: 100%;
    height: 40%;
    background-color: #011935;
    background-image: linear-gradient(135deg, transparent 0%, transparent 56%,rgba(255,171,0, 0.35) 56%, rgba(255,171,0, 0.35) 79%,transparent 79%, transparent 91%,rgba(255,181,0, 0.72) 91%, rgba(255,181,0, 0.72) 100%),linear-gradient(45deg, transparent 0%, transparent 50%,rgba(43,40,148, 0) 50%, rgba(43,40,148, 0) 64%,rgb(255,104,0) 64%, rgb(255,104,0) 85%,transparent 85%, transparent 100%),linear-gradient(90deg, rgb(1,25,53),rgb(1,25,53));
  }

  #chatWin .welcome .bg .btmWhite {
    width: 100%;
    height: 60%;
    background: transparent;
  }

  #chatWin .welcome .overlayGreet {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    padding: 20px 20px;
  }

  #chatWin .welcome .overlayGreet .logoCon {
    width: 60%;
    height: 10%;
    background: #fff;
    border-radius: 5px;
  }

  #chatWin .welcome .overlayGreet .greet {
    width: 100%;
    margin: 10px 0px;
  }

  #chatWin .welcome .overlayGreet .greet p {
    font-size: 16px;
    color: #fff;
    line-height: 1.02rem;
    padding: 5px;
  }

  #chatWin .welcome .overlayGreet .greet .largerTxt {
    font-size: 24px;
  }

  #chatWin .welcome .overlayGreet .formCon {
    width: 100%;
    height: auto;
    display: flex;
    background: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px;
  }

  #chatWin .welcome .overlayGreet .formCon p {
    margin-bottom: 5px;
  }

  #chatWin .welcome .overlayGreet .formCon input {
    width: 100%;
    border: 2px solid #888888;
    padding: 5px 8px;
    margin: 5px 0px;
    border-radius: 5px;
  }

  #chatWin .welcome .overlayGreet .formCon .sndDtBtn {
    width: 100%;
    padding: 5px;
    background: #011935;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
    border-radius: 5px;
  }

  #chatWin .welcome .overlayGreet .formCon .svgCon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  #chatWin .welcome .overlayGreet .formCon .svgCon svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  #chatWin .welcome .overlayGreet .formCon button {
    background: none;
    color: #fff;
  }

  #chatWin .welcome .overlayGreet .divider {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
  }

  #chatWin .welcome .overlayGreet .divider p {
    padding: 0px 10px;
  }

  #chatWin .welcome .overlayGreet .divider hr {
    height: 1px;
    border: 1px solid #888888;
    /* background: #000; */
    width: 120px;
  }

  #chatWin .welcome .overlayGreet .anonymousUser {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px;
  }

  #chatWin .welcome .overlayGreet .anonymousUser .sndDtBtn {
    width: 100%;
    padding: 5px;
    background: #011935;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
    border-radius: 5px;
  }

  #chatWin .welcome .overlayGreet .anonymousUser .svgCon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  #chatWin .welcome .overlayGreet .anonymousUser .svgCon svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  #chatWin .welcome .overlayGreet .anonymousUser button {
    background: none;
    color: #fff;
  }

  #chatWin #chatBoxArea {
    width: 100%;
    height: 100%;
    background: #fff;
  }


  /* CHAT WINDOW HEAD SECTION */
  #chatWin #chatBoxArea .chat_head {
    height: 25%;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #011935;
    background-image: linear-gradient(135deg, transparent 0%, transparent 56%,rgba(255,171,0, 0.35) 56%, rgba(255,171,0, 0.35) 79%,transparent 79%, transparent 91%,rgba(255,181,0, 0.72) 91%, rgba(255,181,0, 0.72) 100%),linear-gradient(45deg, transparent 0%, transparent 50%,rgba(43,40,148, 0) 50%, rgba(43,40,148, 0) 64%,rgb(255,104,0) 64%, rgb(255,104,0) 85%,transparent 85%, transparent 100%),linear-gradient(90deg, rgb(1,25,53),rgb(1,25,53));
    /* padding: 5px; */
    /* border: 2px solid blue; */
  }

  #chatWin #chatBoxArea .chat_head .name {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 60px 10px 15px 10px;
  }

  #chatWin #chatBoxArea .chat_head .name .imgBx {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: #fff;
  
  }

  #chatWin #chatBoxArea .chat_head .name p {
    color: #fff;
    font-size: 21px;
    font-weight: 550px;
    /* border: 2px solid yellow; */
    margin: 0px 10px;
  }

  #chatWin #chatBoxArea .chat_head .funcs {
    width: 15%;
    height: auto;
    top: 10px;
    right: 10px;
    position: absolute;
    display: flex;
    padding: 0px 8px 0px 5px;
    justify-content: space-between;
    flex-direction: row;
  }

  #chatWin #chatBoxArea .chat_head .funcs svg {
    width: 15px;
    height: 15px;
    /* margin: 0px 5px; */
    fill: #fff;
    cursor: pointer;
  }

  /* CHAT WINDOW BODY */
  #chatWin #chatBoxArea .chat_body {
    height: 62%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 8px 0px 0px 10px;
    /* border: 2px solid orange; */
  }

  .chat_body #msg_list {
    width: 100%;
    height: auto;
    color: white;
  }

  /* SCROLL BAR */

  .chat_body::-webkit-scrollbar {
    width: 5px; /* Set scrollbar width */
    margin-left: 5px;
  }

  .chat_body::-webkit-scrollbar-track {
    background-color: #f5f5f5; /* Set background color of the scrollbar track */
    margin: 2px 0px;
  }

  .chat_body::-webkit-scrollbar-thumb {
    background-color: #888; /* Set color of the scrollbar thumb */
    border-radius: 5px;
  }

  /* CHAT INPUT AREA */
  #chatWin #chatBoxArea .input_Area {
    height: 12%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background: #343340; */
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    padding: 0px 15px;
    /* border: 2px solid yellow; */
  }

  /* CHAT WINDOW INPUT FORM */
  #chatWin #chatBoxArea .input_Area #chatBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /* CHAT WINDOW INPUT FIELD */
  #chatWin #chatBoxArea .input_Area #chatBox input {
    width: 65%;
    background: transparent;
    color: #000;
    font-size: 16px;
  }

  #chatWin #chatBoxArea .input_Area #chatBox input::placeholder {
    color: #888888;
  }

  /* CHAT INPUT AREA BUTTONS */
  #chatWin #chatBoxArea .input_Area .btns {
    display: flex;
    flex-direction: row;
  }

  #chatWin #chatBoxArea .input_Area .btns svg {
    width: 16px;
    height: 16px;
    fill: #888888;
    margin: 0px 5px;
    cursor: pointer;
  }

  #chatWin #chatBoxArea .input_Area .btns .call:hover {
    fill: blue;
  }

  /* CHAT WINDOW OPEN ANIMATION */
  @keyframes expandChat {
    0% {
      height: 0;
      width: 0;
      opacity: 0;
      margin-bottom: -20px;
    }
    100% {
      height: 350px;
      width: 300px;
      margin-bottom: 80px;
      opacity: 1;
    }
  }

  /* CHAT WINDOW CLOSE ANIMATION */
  @keyframes shrinkChat {
    0% {
      height: 500px;
      width: 350px;
      margin-bottom: 80px;
      opacity: 1;
    }
    100% {
      height: 0;
      width: 0;
      opacity: 0;
      margin-bottom: -20px;
    }
  }

  /* OPEN CHAT CLASS */
  .chat-open {
    height: 500px;
    width: 350px;
    /* border: solid 1px black; */
    animation: expandChat 0.3s ease-in;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
  }

  /* CLOSE CHAT CLASS */
  .chat-close {
    height: 0;
    width: 0;
    animation: shrinkChat 0.4s ease-out;
    border: none;
  }

  /* HIDE CLASS */
  .hide {
    display: none;
  }

  /* SHOW CLASS */
  .show {
    display: block;
  }

  #sndBtn {
    background: transparent;
  }

  /* ------- added styles for ui design ------- */

  .chatBubble_Me {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-bottom: 20px;
    /* margin-left: auto; */
    /* word-wrap: */
  }

  .message_Me {
    background: #444444;
    color: #ffffff;
    border-radius: 0px 10px 10px 10px;
    margin: 3px 0px 0px 15px;
    padding: 6px 12px;
    width: fit-content;
  }

  .sender_Con {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .sender_Me {
    color: #000;
    margin: 0px;
  }

  .user_Tag_Me {
    padding: 4px 6px;
    font-size: 15px;
    color: rgb(255, 255, 255);
    background: rgb(52, 93, 129);
    border-radius: 50%;
    margin: 0px 5px 2px 0px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bkg_change_me {
    background: #f37a23;
    padding: 6px 12px;
  }

  .position_Me {
    margin-left: auto;
    padding-right: 10px;
    border-radius: 10px 10px 0px 10px;
  }

 



`;
export { style };

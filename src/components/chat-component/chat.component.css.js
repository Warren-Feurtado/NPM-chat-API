
import {css} from "lit"

const style = css ` 
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
    background-color: #00f;
    color: #fff;
    border-radius: 50%;
    position: fixed;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
  }

  /* CHAT WINDOW */
  #chatWin {
    /* width: 0px;
    height: 0px; */
    border-radius: 5px;
    background: #000;
    position: absolute;
    bottom: 10px;
    right: 10px;
    overflow: hidden;
    display: none;
  }

  /* CHAT WINDOW HEAD SECTION */
  #chatWin .chat_head {
    height: 15%;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #206ba8;
    /* padding: 5px; */
    /* border: 2px solid blue; */
  }

  #chatWin .chat_head .name {
    width: 80%;
  }

  #chatWin .chat_head .name p {
    color: #fff;
    font-size: 18px;
    font-weight: 550px;
    /* border: 2px solid yellow; */
    margin: 0px 10px;
  }

  #chatWin .chat_head .funcs {
    width: 20%;
    display: flex;
    padding: 0px 8px 0px 5px;
    justify-content: space-between;
    flex-direction: row;
  }

  #chatWin .chat_head .funcs svg {
    width: 15px;
    height: 15px;
    /* margin: 0px 5px; */
    fill: #fff;
    cursor: pointer;
  }

  /* CHAT WINDOW BODY */
  #chatWin .chat_body {
    height: 73%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 1px 5px;
    /* border: 2px solid orange; */
  }

  .chat_body #msg_list {
    width: 100%;
    height: auto;
    color: white;
  }

  /* CHAT INPUT AREA */
  #chatWin .input_Area {
    height: 12%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #343340;
    padding: 0px 5px;
    /* border: 2px solid yellow; */
  }

  /* CHAT WINDOW INPUT FORM */
  #chatWin .input_Area #chatBox {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  
  /* CHAT WINDOW INPUT FIELD */
  #chatWin .input_Area #chatBox input {
    width: 65%;
    background: transparent;
    color: #fff;
  }

  #chatWin .input_Area #chatBox input::placeholder {
    color: #888888;
  }

  /* CHAT INPUT AREA BUTTONS */
  #chatWin .input_Area .btns {
    width: 35%;
    display: flex;
    flex-direction: row;
  }

  #chatWin .input_Area .btns svg {
    width: 16px;
    height: 16px;
    fill: #888888;
    margin: 0px 5px;
    cursor: pointer;
  }

  #chatWin .input_Area .btns .call:hover {
    fill: ;
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
      height: 300px;
      width: 250px;
      margin-bottom: 80px;
      opacity: 1;
    }
  }

  /* CHAT WINDOW CLOSE ANIMATION */
  @keyframes shrinkChat {
    0% {
      height: 300px;
      width: 250px;
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
    height: 300px;
    width: 250px;
    /* border: solid 1px black; */
    animation: expandChat 0.3s ease-in;
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
`
export { style }

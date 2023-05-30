
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
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px; */
    background-color: rgba(6, 3, 100);
    /* color: #fff; */
    border-radius: 50%;
    position: fixed;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease;
  }

  #chatBub:hover{ 
    transform: scale(1.1);
    box-shadow: 1px 1px 3.5px 2px rgba(0, 0, 0, 0.4);
  }

  /* CHAT WINDOW */
  #chatWin {
    /* width: 0px;
    height: 0px; */
    border-radius: 5px;
    background: #000;
    position: absolute;
    bottom: 80px;
    right: 10px;
    overflow: hidden;
    display: none;
    /* box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25); */
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
  background-color: #F5F5F5; /* Set background color of the scrollbar track */
  margin: 2px 0px;
}

 .chat_body::-webkit-scrollbar-thumb {
  background-color: #888; /* Set color of the scrollbar thumb */
  border-radius: 5px;
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
    padding: 0px 15px;
    /* border: 2px solid yellow; */
  }

  /* CHAT WINDOW INPUT FORM */
  #chatWin .input_Area #chatBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  color: #FFFFFF;
  border-radius: 10px 10px 10px 0px;
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
  color: #FFFFFF;
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
  background: #F37A23;
  padding: 6px 12px;
 }

 .position_Me{
  margin-left: auto;
  padding-right: 10px;
  border-radius:10px 10px 0px 10px;
 }


`
export { style }

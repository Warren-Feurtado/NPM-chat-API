import { html, TemplateResult } from "lit";
import { ChatFunctions } from "./chat.component.functions";

const innerHtml =
  /**
   * Produces the html template of the component
   * @param {ChatFunctions} chatFunctions
   * @returns {TemplateResult}
   */
  (chatFunctions) =>
    html`
    <!-- CHAT BUBBLE -->
    <div id="parentWidget">
      <button id="chatBub" @click="${chatFunctions.chatToggle}">
      <svg id="chatIcon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 279.000000 287.000000" preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,287.000000) scale(0.100000,-0.100000)" fill="rgba(236, 236, 236)" stroke="none">
      <path d="M2051 2825 c-85 -21 -190 -79 -255 -139 l-58 -54 -57 19 c-121 43 -264 61 -431 56 -85 -3 -164 -7 -175 -10 -11 -3 -50 -12 -86 -21 -133 -31 -271 -93 -404 -182 -146 -97 -188 -162 -163 -251 8 -31 7 -39 -14 -62 -107 -116 -200 -312 -237 -498 -17 -83 -21 -139 -21 -316 l0 -215 -34 -6 c-37 -7 -80 -37 -97 -67 -6 -11 -10 -91 -10 -189 0 -230 8 -241 171 -250 l95 -5 6 -60 c6 -64 23 -103 64 -148 35 -39 84 -57 154 -57 50 0 66 5 107 33 29 19 57 49 71 76 23 44 23 47 23 410 0 334 -2 370 -19 407 -36 79 -125 128 -211 117 -117 -15 -190 -100 -190 -219 0 -38 -3 -44 -21 -44 l-22 0 6 233 c5 202 9 244 30 322 32 122 80 232 138 318 76 114 74 112 154 112 l70 0 85 62 c165 120 294 169 518 198 74 10 213 -11 350 -51 21 -6 22 -11 22 -103 -1 -103 14 -169 56 -253 l24 -46 -35 -106 c-39 -116 -40 -124 -23 -160 19 -43 61 -43 188 -1 l112 37 76 -23 c62 -20 99 -24 194 -24 116 0 117 0 123 -25 3 -14 9 -130 12 -257 l6 -233 -22 0 c-19 0 -21 6 -21 50 0 93 -40 156 -124 195 -47 23 -69 24 -154 9 -44 -7 -117 -80 -132 -131 -8 -26 -10 -153 -8 -405 l3 -366 30 -44 c17 -23 51 -54 76 -68 53 -29 53 -38 0 -93 -37 -40 -86 -69 -134 -81 -16 -4 -130 -7 -254 -7 l-226 0 -26 25 c-30 29 -100 61 -153 71 -76 14 -159 -44 -174 -122 -8 -43 24 -114 66 -145 57 -41 163 -25 245 37 l45 35 208 0 c114 0 233 4 266 10 116 19 214 89 265 191 24 47 39 65 73 83 65 34 98 88 106 172 l7 69 86 2 c99 1 140 17 169 66 17 28 20 51 20 180 0 162 -9 199 -54 235 -15 11 -40 24 -56 27 l-30 7 0 171 c0 95 -7 217 -15 272 -7 55 -13 100 -12 101 1 0 31 16 67 35 145 75 260 231 294 401 20 95 20 143 1 232 -43 205 -182 366 -383 443 -82 32 -253 41 -341 18z m238 -90 c129 -27 238 -100 314 -210 139 -203 111 -466 -69 -635 -115 -107 -271 -157 -411 -131 -37 7 -88 21 -112 32 -58 26 -82 24 -186 -11 -49 -16 -90 -29 -91 -27 -2 2 11 46 28 99 l32 96 -36 73 c-56 115 -71 217 -47 331 38 182 198 343 382 383 82 18 112 18 196 0z m-2019 -1845 l0 -160 -73 0 c-43 0 -78 5 -85 12 -17 17 -17 279 0 296 7 7 42 12 85 12 l73 0 0 -160z m2208 11 c2 -97 -1 -148 -9 -157 -8 -10 -35 -14 -85 -14 l-74 0 0 160 0 161 83 -3 82 -3 3 -144z"/>
      <path d="M2141 2520 c-49 -12 -83 -40 -109 -91 -37 -74 -12 -133 48 -114 12 4 24 21 30 45 22 82 101 94 139 22 17 -33 -2 -77 -40 -92 -49 -21 -69 -55 -69 -120 0 -58 8 -70 45 -70 22 0 45 30 45 59 0 21 10 34 43 58 68 47 94 126 66 200 -15 41 -68 91 -103 98 -17 4 -38 8 -46 10 -8 1 -30 -1 -49 -5z"/>
      <path d="M2158 2029 c-18 -10 -23 -44 -12 -73 9 -23 61 -21 74 3 14 28 13 38 -10 61 -23 23 -28 24 -52 9z"/>
      <path d="M1260 1260 c-23 -14 -28 -601 -5 -636 17 -26 44 -31 63 -12 9 9 12 94 12 319 0 169 -3 314 -6 323 -7 18 -41 21 -64 6z"/>
      <path d="M982 1121 c-17 -11 -17 -347 0 -368 15 -18 42 -16 61 5 14 16 17 44 17 179 0 142 -2 162 -18 176 -20 19 -40 21 -60 8z"/>
      <path d="M1536 1108 c-24 -33 -23 -313 0 -347 13 -18 22 -21 43 -16 14 4 29 12 33 18 4 7 8 85 8 174 0 134 -3 164 -16 177 -22 22 -50 20 -68 -6z"/>
      </g>
      </svg>


      <svg id="closeIcon" class="hide" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="rgba(236, 236, 236)" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      
      </button>

      <!-- <button id="chatBub" @click="${chatFunctions.chatToggle}">
       
      </button> -->
      
      <!-- CHAT WINDOW -->
      <div id="chatWin" class="hide" >
        <div class="welcome">
            <div class="bg">
                <div class="topBlue"></div>
                <div class="btmWhite"></div>
            </div>

            <div class="overlayGreet">
                <div class="logoCon">
                    <!-- <img src="" alt=""> -->
                </div>
                <div class="greet">
                    <p class="largerTxt">Hi, Welcome To Our Chat</p>
                    <p>How Can We Assist You?</p>
                </div>
                <div class="formCon">
                    <form action="" @submit="${chatFunctions.validateEmail}" >
                        <p>For a more personalized experience </p>
                        <p class="lwTxt">please provide name and email below</p>
                        <input type="text" id="u_name" placeholder="Name...">
                        <input type="email" id="u_email" placeholder="Email Address...">
                        <div class="sndDtBtn">
                            <div class="svgCon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                            </div>   
                            <button>Start A New Conversation</button>
                        </div>
                    </form>
                </div>
                <div class="divider">
                    <hr/> 
                         <p>or</p>
                    <hr/>
                </div>
                <div class="anonymousUser">
                    <p>Enter as a guest</p>
                    <div class="sndDtBtn" @click="${chatFunctions.guestLogin}">
                            <div class="svgCon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                            </div>   
                            <button>Start Conversation As Guest</button>
                        </div>

                </div>
            </div>
        </div>


        <div id="chatBoxArea" class='hide'>
            <div class="chat_head">
                <div class="name">
                    <div class="imgBx">
                        <!-- <img src="" alt=""> -->
                    </div>
                    <p id="agentNm">Agent Name</p>
                </div>
    
                <div class="funcs">
                    <div title="minimize" @click="${chatFunctions.newUser}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                    </div>
                    <div title="close" id="chatClose" @click="${chatFunctions.chatToggle}">
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </div>
                </div>
            </div>
    
            <div class="chat_body">
              <div id="msg_list">
              </div>
            </div>
        
            <div class="input_Area" >   
                <form id="chatBox" action="" @submit="${chatFunctions.sendMsg}">
                    <input type="text" id="newMsg" placeholder="Type text here...">
                <div class="btns">
                    <div title="Call">
                        <svg title="call" class="call" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    </div>
                    <div title="VoiceNote">
                        <svg class="vn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
                    </div>
                    <button title="Send" id="sndBtn">
                       <svg class="file" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                    </button>
                </div>
                </form>
            </div>
        </div>
        
      </div>
</div>
    `;

export { innerHtml };

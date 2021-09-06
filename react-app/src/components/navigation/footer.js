import React from "react";
import './footer.css';

function Footer() {
    return (
        <div className='footerContainer'>

            <div className='footerWrap'>
            </div>

            <div className='footer'>

                <ul className='footerList'>
                    <li>
                        App by: Jonathan Chan</li>
                    <li>
                        <a target='https://www.linkedin.com/in/cheeyongjc/' href='https://www.linkedin.com/in/cheeyongjc/'>
                            LinkedIn 
                            <img className='linkedinlogo' alt='linkedin' src='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/LI-In-Bug.png'>
                            </img>
                        </a>
                    </li>
                    <li>
                        <a target='https://github.com/cheeyongjc/hiddencabin' href='https://github.com/cheeyongjc/hiddencabin'>Github
                            <img alt='github' src='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/GitHub-Mark-Light-32px.png'>
                            </img>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;

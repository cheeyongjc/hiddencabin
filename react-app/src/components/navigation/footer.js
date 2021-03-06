import React from "react";
import './footer.css';

function Footer() {
    return (
        <div className='footerContainer'>
            <div className='footerName'>
                App by: Jonathan Chan
            </div>
            <div className='footerLinkedin'>
                <a target='https://www.linkedin.com/in/cheeyongjc/' href='https://www.linkedin.com/in/cheeyongjc/' className='footerLinkedin'>
                    LinkedIn  <img className='linkedinlogo' alt='linkedin' src='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/LI-In-Bug.png' /></a>

            </div>
            <div className='footerGithub'>
                <a target='https://github.com/cheeyongjc/hiddencabin' href='https://github.com/cheeyongjc/hiddencabin' className='footerGithub'>
                    Github  <img alt='github' src='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/GitHub-Mark-Light-32px.png' /></a>
            </div>
        </div>
    )
}

export default Footer;

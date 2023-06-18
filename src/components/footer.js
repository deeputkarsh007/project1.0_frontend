import react from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import "../CSS/footer.css";
import { AddBusiness } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <h1>Contact Us</h1>
        <ul>
          <li>
            <a href="https://google.com" target="_blank">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="https://google.com" target="_blank">
              <LinkedInIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="right">
        <ul className="address">
          <li>
            <EmailIcon className="icon" />
            deeputkarsh007@gmail.com
          </li>
          <li>
            <BusinessIcon className="icon" />
            Dhanbad, Jharkhand
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

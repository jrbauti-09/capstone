import React from "react";

import "./Footer.css";

export default function Footer({ status }) {
  if (status === "user-logged") {
    return (
      <div className="footer_">
        <div className="footer-content_">
          Copyright © 2022 Food For Thought | No Terms & Conditions | You Have
          No Privacy Here
        </div>
      </div>
    );
  }

  return (
    <div className="footer">
      <div className="footer-content">
        Copyright © 2022 Food For Thought | No Terms & Conditions | You Have No
        Privacy Here
      </div>
    </div>
  );
}

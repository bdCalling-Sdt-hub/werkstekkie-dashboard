/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const ActiveLinkwork = ({ label, href }) => {
  const location = useLocation();

  // Ensure trailing slashes don't affect the comparison
  const normalizedPath = location.pathname.replace(/\/$/, "");
  const normalizedHref = href.replace(/\/$/, "");

  // Check if the current pathname starts with the link's href for child routes
  const isActive = normalizedPath.startsWith(normalizedHref);

  return (
    <Link
      to={href}
      className={`text-[17px] py-1  ${isActive ? "text-[#161D6F] border-b-[2px] border-[#161D6F] font-semibold" : "font-semibold text-gray-950"}`}
    >
     {label}
    </Link>
  );
};

export default ActiveLinkwork;

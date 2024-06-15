import { Link } from "react-router-dom";
 import stylGoBtn from './GoBackBtn.module.css'
export const GoBackBtn = ({path,children}) => {
  return <Link className={stylGoBtn.goBackBtn}  to={path}>
    {children}
  </Link>;
};
export default GoBackBtn
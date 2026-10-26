import Body from "../Body/Body";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors";
import Aside from "../Aside/Aside";

const Page = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <>
      {isAuthenticated && <Aside />}
      <Body />
    </>
  );
};

export default Page;

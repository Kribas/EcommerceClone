import React from "react";
import { useProductsStore } from "../../store";

const UserProfile = () => {
  const authUser = useProductsStore((state: any) => state.authUser);

  console.log("User", authUser);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default UserProfile;

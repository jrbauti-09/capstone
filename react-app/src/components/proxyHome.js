import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getThoughts } from "../store/thoughts";

export default function ProxyHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);
  return <div>proxyHome</div>;
}

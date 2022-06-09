import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addThought } from "../../store/thoughts";
import { useHistory, Link } from "react-router-dom";

export default function AddThought() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user.id);

  const [errors, setErrors] = useState([]);

  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  // Remember this is required, max length is 255.
  const [name, setName] = useState("");

  return <div>AddThought</div>;
}

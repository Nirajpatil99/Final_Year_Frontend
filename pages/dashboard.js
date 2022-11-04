import SecondaryHeader from "../components/SecondaryHeader";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useState } from "react";
import axios from "axios";
import VisualListItem from "../components/VisualListItem";
import DailyProdVisuals from "../components/DailyprodVisuals";
import MisprodVisuals from "../components/MisprodVisuals";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [fileType, setFileType] = useState("MIS Production");
  const [file, setFile] = useState(null);
  const [error, setError] = useState({ active: false, msg: "" });
  const [visualList, setVisualList] = useState([]);
  const [data, setData] = useState({});
  const [currentSheet, setCurrentSheet] = useState({ type: undefined });
  const { isUserAuthenticated, authState } = useContext(AuthContext);
  const router = useRouter();
  // console.log(state.isUserAuthenticated);

  useEffect(() => {
    if (!isUserAuthenticated()) router.push("/");
  }, []);

  const resetStates = () => {
    setData({});
    setVisualList([]);
    // setCurrentSheet({
    //   type: undefined,
    // });
    setError({ active: false, msg: "" });
  };

  const onOptionChange = (event) => {
    resetStates();
    setFileType(event.target.value);
  };

  const handleFileChange = (event) => {
    resetStates();
    setFile(event.target.files[0]);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    resetStates();
    // if(file === null || fileType === ""){
    // setError({active:true,})
    // }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const url =
        fileType === "MIS Production"
          ? `${process.env.API_BASE_URL}/misprod`
          : `${process.env.API_BASE_URL}/dailyprod`;
      const res = await axios({
        method: "post",
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const resData = res.data;
      if (res.status === 200) {
        setData(resData);
        setVisualList(
          fileType === "MIS Production" ? [] : Object.keys(resData)
        );
        fileType === "MIS Production" &&
          setCurrentSheet({
            data: resData,
            title: "",
            type: "misprod",
          });
      }
      // console.log(resData);
      // console.log(visualList);
    } catch (error) {
      setData({});
      setVisualList([]);
      setCurrentSheet({
        type: undefined,
      });
      let msg = "Please try again later or Check file type";
      setError({ active: true, msg });
    }
  };

  return (
    <>
      <div>
        <SecondaryHeader />
        <div
          className="container mx-auto my-10 bg-white p-10 shadow-lg text-center w-4/5"
          style={{ minHeight: "70vh" }}
        >
          <form
            className="container p-2 flex flex-col justify-center text-center mx-auto"
            onSubmit={handleOnSubmit}
          >
            <span className="font-bold text-2xl">
              Welcome <span className="text-accent">{authState.username}</span>{" "}
              to{" "}
              <span className="text-accent">
                Fluid Control Analytic Dashboard
              </span>
            </span>
            <br />
            <br />

            <div className="flex flex-col flex-wrap justify-center content-center">
              <p className="text-accent text-xl">
                Please Choose File to Upload (MIS Production / Daily Production)
              </p>
              <br />
              <input
                type="file"
                className="my-auto mx-auto"
                onChange={handleFileChange}
                required
              />
              <br />
              <span>
                <label>Select File Type</label>
                <br />
                <select
                  placeholder="sdfdfsf"
                  className="bg-grey-color p-2 mt-3"
                  onChange={onOptionChange}
                  required
                >
                  <option>MIS Production</option>
                  <option>Daily Production</option>
                </select>
              </span>
            </div>

            <div className="mt-6">
              <Button className="mx-6 my-2 " type="submit">
                Submit
              </Button>
            </div>
            <div className="w-full mt-10">
              {visualList.map((vi, i) => (
                <VisualListItem
                  name={vi}
                  data={data[vi]}
                  key={i}
                  onClick={() => {
                    setCurrentSheet({
                      data: data[vi],
                      title: vi,
                      type: "dailyprod",
                    });
                  }}
                />
              ))}
            </div>
            {error.active && <span className="text-red">{error.msg}</span>}
          </form>
        </div>
      </div>
      {currentSheet.type && currentSheet.type === "dailyprod" && (
        <DailyProdVisuals
          dayTitle={currentSheet.title}
          data={currentSheet.data}
        />
      )}
      {currentSheet.type && currentSheet.type === "misprod" && (
        <MisprodVisuals
          dayTitle={currentSheet.title}
          data={currentSheet.data}
        />
      )}
    </>
  );
};

export default Dashboard;

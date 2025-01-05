// import { createContext, useState } from "react";

// export const SnackbarContext = createContext({
//   isDisplayed: false,
//   displayMsg: (msg: string) => {},
//   onClose: () => {},
// });

// export const SnackBarContextProvider = (props) => {
//   const [msg, setMsg] = useState("");
//   const [isDisplayed, setIsDisplayed] = useState(false);

//   const displayHandler = (msg: string) => {
//     setMsg(msg);
//     setIsDisplayed(true);
//     timer = setTimeout(() => {
//       closeHandler();
//     }, 3000); // close snackbar after 3 seconds
//   };

//   const closeHandler = () => {
//     clearTimeout(timer);
//     setIsDisplayed(false);
//   };

//   return (
//     <SnackbarContext.Provider
//       value={{
//         msg,
//         isDisplayed,
//         displayMsg: displayHandler,
//         onClose: closeHandler,
//       }}
//     >
//       {props.children}
//     </SnackbarContext.Provider>
//   );
// };

// export function Snackbar() {
//   const snackbarCtx = useContext(SnackbarContext);

//   return (
//     <div className="snackbar__container">
//       <div className="snackbar__label">{snackbarCtx.msg}</div>
//       <div className="snackbar__dismiss" onClick={snackbarCtx.onClose}>
//         &times;
//       </div>
//     </div>
//   )
// }
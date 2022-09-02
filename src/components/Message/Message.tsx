export interface MessageProps {
  type: "warning" | "info" | "danger" | "success";
  children?: React.ReactNode;
}

function Message(props: MessageProps) {
  function getAlertCss() {
    switch (props.type) {
      case "warning":
        return "alert-warning";
      case "info":
        return "alert-info";
      case "danger":
        return "alert-danger";
      case "success":
        return "alert-success";
      default:
        return "alert-secondary";
    }
  }

  return (
    <div className={`alert ${getAlertCss()}`} role="alert">
      {props.children}
    </div>
  );
}

export default Message;

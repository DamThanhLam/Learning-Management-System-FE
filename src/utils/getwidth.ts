export default function getWidth(key: string) {
    switch (key) {
      case "userName":
        return "w-40";
      case "email":
        return "w-48";
      case "phoneNumber":
      case "birthday":
      case "gender":
      case "status":
        return "w-24";
      case "description":
        return "w-60";
      case "cvFile":
        return "w-28";
      case "action":
        return "w-20";
      default:
        return "w-32";
    }
  }
  
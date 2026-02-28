"use client";

import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const NotificationMobile = () => {
  const handleRequestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        toast.success("Notificações liberadas!");
        console.log("Notificação liberada! 🚀");
      }
    });
  };

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-primary h-12 w-12" // Aumentei o botão também para caber o sino
        onClick={handleRequestPermission}
      >
        <Bell size={32} strokeWidth={2.5} />
      </Button>
    </div>
  );
};

export default NotificationMobile;

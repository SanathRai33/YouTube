import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const ChannelDialogue = ({ isOpen, onClose, channeldata, mode }: any) => {
  const user = {
    id: "12345",
    name: "John Doe",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  };

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (channeldata && mode === "edit") {
      setFormData({
        name: channeldata.name || "",
        description: channeldata.description || "",
      });
    } else {
      setFormData({
        name: user?.name || "",
        description: "",
      });
    }
  }, [channeldata]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create your channel" : "Edit your channel"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1 font-medium text-gray-700"
            >
              Channel Name
            </label>
            <input
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-1 font-medium text-gray-700"
            >
              Channel Description
            </label>
            <Textarea
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <DialogFooter>
            <Button onClick={onClose} type="button" variant="outline">
              Close
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                ? "Create Channel"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDialogue;

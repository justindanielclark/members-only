"use client";
import type { User } from "../../../../types/types";
import { useState } from "react";
import { ChangeEvent, MouseEvent } from "react";
import { toast } from "react-toastify";
import ImageWithFallback from "@/lib/sharedComponents/FallbackImage";
import updateUser from "@/lib/api/updateUser";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  userID: string;
  provider: string;
  imgsrc: string;
};

export default function ProfileForm({ user, provider, imgsrc, userID }: Props) {
  const [originalHandle, setOriginalHandle] = useState<string>(user.handle);
  const [originalAboutMe, setOriginalAboutMe] = useState<string>(user.aboutMe);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [handle, setHandle] = useState<string>(user.handle);
  const [aboutMe, setAboutMe] = useState<string>(user.aboutMe);
  const [isHandleError, setIsHandleError] = useState<boolean>(false);
  const [isAboutMeError, setIsAboutMeError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const haveChangesBeenMade = (newHandle: string, newAboutMe: string) => {
    return !(newHandle === originalHandle && newAboutMe === originalAboutMe);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChangesMade(haveChangesBeenMade(value, aboutMe));
    setIsHandleError(value.length < 3 || value.length > 20);
    setHandle(e.target.value);
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setChangesMade(haveChangesBeenMade(handle, e.target.value));
    setIsAboutMeError(value.length >= 200);
    setAboutMe(e.target.value);
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (isAboutMeError || isHandleError || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const submissionRequest = updateUser({ aboutMe, handle, lookup: user.lookup })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Res Not Okay");
      })
      .then((data) => {
        setIsSubmitting(false);
        setOriginalHandle(handle);
        setOriginalAboutMe(aboutMe);
        setChangesMade(false);
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject();
      });

    toast.promise(submissionRequest, {
      pending: "Updating User Profile",
      success: "Profile Updated!",
      error: "There Was An Issue With The Server",
    });
  };
  return (
    <form action="/api/profile" method="PUT" className="my-4">
      <div className="bg-slate-700/20 px-6 py-4 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
            <h2 className="font-bold text-xl">Your Profile ID:</h2>
            <p className="text-xs flex-1 text-right sm:whitespace-nowrap">
              Generated On Account Creation, share with friends
            </p>
          </div>
          <p>{userID}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
            <h2 className="font-bold text-xl">Your Profile Photo:</h2>
            <p className="text-xs flex-1 text-right sm:whitespace-nowrap">
              Taken from your Auth Provider: {provider.slice(0, 1).toUpperCase() + provider.slice(1)}
            </p>
          </div>
          <ImageWithFallback
            src={imgsrc}
            width={40}
            height={40}
            alt="User Profile Photo"
            crossOrigin=""
            priority={true}
            className="rounded-lg h-10 max-h-10 w-10 max-w-10 border-white border"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
            <label htmlFor="handle" className="font-bold text-xl">
              User Handle:
            </label>
            <p className="text-xs flex-1 text-right sm:whitespace-nowrap">This is the name other users will see</p>
          </div>
          <input
            name="handle"
            id="handle"
            type="text"
            className="text-black p-2 my-2"
            value={handle}
            onChange={handleInputChange}
          />
          <p
            className={`text-xs flex-1 text-right sm:whitespace-nowrap ${
              isHandleError ? "text-red-400" : "text-green-400"
            }`}
          >
            Min: 3 Characters, Max: 20 Characters
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
            <label htmlFor="aboutMe" className="font-bold text-xl">
              About Me:
            </label>
            <p className="text-xs flex-1 text-right sm:whitespace-nowrap">
              Optional description of yourself and what type of movies you love
            </p>
          </div>
          <textarea
            name="aboutMe"
            id="aboutMe"
            rows={4}
            className="text-black p-2 my-2"
            value={aboutMe}
            onChange={handleTextAreaChange}
          />
          <p
            className={`text-xs flex-1 text-right sm:whitespace-nowrap ${
              isAboutMeError ? "text-red-400" : "text-green-400"
            }`}
          >
            Max: 200 Characters
          </p>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={`whitespace-nowrap my-4 p-2 rounded-lg float-right after:clear-both ${
          isSubmitting
            ? "bg-inherit"
            : changesMade
            ? isAboutMeError || isHandleError
              ? "bg-red-900"
              : "bg-green-900"
            : "bg-gray-900"
        }`}
      >
        {isSubmitting
          ? "Submitting..."
          : changesMade
          ? isAboutMeError || isHandleError
            ? "Please Fix Errors Above."
            : "Click To Submit Changes!"
          : "Make Changes and Click Here To Save!"}
      </button>
    </form>
  );
}

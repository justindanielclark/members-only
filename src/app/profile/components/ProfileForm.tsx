"use client";

export default function ProfileForm() {
  return (
    <form action="" className="my-4 mx-2">
      <div className="flex flex-col my-4">
        <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
          <label htmlFor="handle" className="font-bold text-xl">
            User Handle:
          </label>
          <p className="text-xs flex-1 text-right sm:whitespace-nowrap">This is the name other users will see</p>
        </div>
        <input name="handle" id="handle" type="text" className="text-black p-2 my-2"></input>
      </div>
      <div className="flex flex-col my-4">
        <div className="flex flex-col sm:flex-row sm:items-end flex-wrap">
          <label htmlFor="aboutMe" className="font-bold text-xl">
            About Me:
          </label>
          <p className="text-xs flex-1 text-right sm:whitespace-nowrap">
            Optional description of yourself and what type of movies you love
          </p>
        </div>
        <textarea name="aboutMe" id="aboutMe" rows={4} className="text-black p-2 my-2"></textarea>
      </div>
      <button></button>
    </form>
  );
}

import Image from "next/image";
import zoom_in from "@public/assets/icons/zoom_in.svg";
import zoom_out from "@public/assets/icons/zoom_out.svg";
import rotate from "@public/assets/icons/rotate.svg";
import dimension from "@public/assets/icons/dimension.svg";
import mention from "@public/assets/icons/mention.svg";
import text from "@public/assets/icons/text.svg";

import ImportButton from "./ImportButton";

import CommentButton from "./CommentButton";
import DimensionButton from "./DimensionButton";
import MentionButton from "./MentionButton";
import TextButton from "./TextButton";
import MoveButton from "./MoveButton";

const Toolbar = () => {

  return (
    <div className="flex justify-center items-center w-full fixed top-[10px] z-50">
      <div className="flex justify-around items-center p-2 bg-black rounded-2xl w-fit h-[40px] mx-[10px]">
        <ImportButton />

        <MoveButton />

        <CommentButton />

        <DimensionButton />

        <MentionButton />

        <TextButton />
      </div>
    </div>
  );
};

export default Toolbar;

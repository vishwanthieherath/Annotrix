"use client";

import LeftSidePanel from "@components/project_workspace/left_side_panel/LeftSidePanel";
import RightSidePanel from "@components/project_workspace/right_side_panel/RightSidePanel";
import Toolbar from "@components/project_workspace/toolbar/Toolbar";
import { AnnotationProvider } from "@contexts/AnnotationContext";

import { FileProvider } from "@contexts/FileContext";
import { SceneProvider } from "@contexts/SceneContext";

const ProjectLayout = ({ children }) => {
  return (
    <FileProvider>
      <SceneProvider>
        <AnnotationProvider>
            <div>
              <Toolbar />
              <LeftSidePanel />
              <RightSidePanel />
              {children}
            </div>
        </AnnotationProvider>
      </SceneProvider>
    </FileProvider>
  );
};

export default ProjectLayout;

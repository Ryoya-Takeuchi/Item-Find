import * as React from "react";
import { ModuleContext } from "../../contexts/Module/index";

interface ISelectFormat {
  label: string;
  value: string;
}

type Status = "start" | "done" | "error" | "init";

export default function useForSelectDomain() {
  const [selectHierarchies, setSelectHierarchies] = React.useState<
    ISelectFormat[]
  >([]);
  const [status, setStatus] = React.useState<Status>("init");
  const { hierarchyService } = React.useContext(ModuleContext);

  const run = React.useCallback(() => {
    const logic = async () => {
      try {
        const hierarchies = await hierarchyService.getHierarchys();
        const selectFormats = hierarchies.map((hierarchy) => {
          return { label: hierarchy.hierarchy_name, value: hierarchy.id };
        });
        return [{ label: "選択なし", value: "" }, ...selectFormats];
      } catch (error) {
        setStatus("error");
      }
    };

    setStatus("start");
    logic()
      .then((res) => {
        setSelectHierarchies(res);
        setStatus("done");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return {
    run,
    selectHierarchies,
    status,
  };
}

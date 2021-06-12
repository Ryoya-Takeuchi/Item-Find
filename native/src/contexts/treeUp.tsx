import * as React from "react";

interface Context {
  isTreeUp: boolean;
  onTreeUp: () => void;
}

const defaultContext: Context = {
  isTreeUp: false,
  onTreeUp: undefined,
};

const treeUpContext = React.createContext<Context>(defaultContext);
const { Provider } = treeUpContext;

const TreeUpProvider = ({ children }: any) => {
  const [isTreeUp, setTreeUp] = React.useState<boolean>(false);
  const onTreeUp = () => {
    setTreeUp((bool) => !bool);
  };
  return <Provider value={{ isTreeUp, onTreeUp }}>{children}</Provider>;
};

export { treeUpContext };
export default TreeUpProvider;

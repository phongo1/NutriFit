import { createContext, useContext, useState } from "react";

interface AccountContextType {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<any>>;
}

const AccountContext = createContext<AccountContextType | null>(null);

export const AccountProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
      throw new Error("useAccount must be used within an AccountProvider");
    }
    return context;
  };
  
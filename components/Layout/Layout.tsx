import Navbar from "@components/Navbar/Navbar";
import React from "react";

const Layout: React.FC<any> = ({ children }) => {
    return (
        <div className={"container"}>
            <Navbar/>
            {children}
            <footer> This is a footer </footer>
            <style jsx>{`
              footer {
                background-color: brown;
              }
            `}</style>
        </div>
    );
}

export default Layout;
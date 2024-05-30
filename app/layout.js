import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import ProvideQueryClient from "./ProvideQueryClient";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./context/authContext";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ProvideQueryClient>
          <AuthProvider>
            <MantineProvider>
              <Notifications />
              {children}
            </MantineProvider>
          </AuthProvider>
        </ProvideQueryClient>
      </body>
    </html>
  );
}

import { Component, ReactNode } from "react";

type CardDataRegistrasiProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  value: number;
  loading: boolean;
  color: string;
  backgroundColor: string;
};
export default class CardDataRegistrasi extends Component<CardDataRegistrasiProps> {
  render(): ReactNode {
    const { title, text, icon, value, loading, color, backgroundColor } =
      this.props;
    return (
      <>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                {loading ? "—" : value}
              </h2>
              <p className="mt-1 text-xs text-gray-500">{text}</p>
              {/* <p className="mt-1 text-xs text-gray-500">Seluruh pendaftaran</p> */}
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${backgroundColor} ${color} dark:bg-blue-500/10 dark:text-blue-400`}
            >
              {icon}
              {/* <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6"
                />
              </svg> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

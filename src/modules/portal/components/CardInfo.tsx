import { Component, ReactNode } from "react";

export default class CardInfo extends Component<{
  text: string | undefined;
  icon: ReactNode;
  iconColor: string;
  title: string;
}> {
  render(): ReactNode {
    return (
      <>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-3 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 ${this.props.iconColor} dark:bg-blue-500/10 dark:text-blue-400`}
            >
              {this.props.icon}
              {/* <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg> */}
            </div>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {this.props.title}
            </p>
          </div>

          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {this.props.text || "-"}
          </p>
        </div>
      </>
    );
  }
}

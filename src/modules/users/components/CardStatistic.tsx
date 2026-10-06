import { Component, ReactNode } from "react";
interface CardStatisticProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}
export default class CardStatistic extends Component<CardStatisticProps> {
  render(): ReactNode {
    const { title, value, icon } = this.props;
    return (
      <>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </p>

              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {/* {users.length} */}
                {value}
              </h4>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              {icon}

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
                  d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

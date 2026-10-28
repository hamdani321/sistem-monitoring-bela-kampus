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

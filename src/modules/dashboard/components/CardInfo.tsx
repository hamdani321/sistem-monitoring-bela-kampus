import { Component, ReactNode } from "react";

// const colorStyles: Record<string, string> = {
//   indigo: "bg-indigo-50 text-indigo-600",
//   blue: "bg-sky-50 text-sky-600",
//   violet: "bg-violet-50 text-violet-600",
//   amber: "bg-amber-50 text-amber-600",
// };

interface CardInfoProps {
  title: string;
  value: string;
}

export default class CardInfo extends Component<CardInfoProps> {
  render(): ReactNode {
    return (
      <>
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {this.props.title}
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {this.props.value}
              </p>
            </div>

            {/* <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                colorStyles[item.color]
              }`}
            >
              {this.renderIcon(item.icon)}
            </div> */}
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {/* <p className="text-xs text-slate-500">{item.description}</p> */}
            <p className="text-xs text-slate-500">fjdflj</p>
          </div>
        </div>
      </>
    );
  }
}

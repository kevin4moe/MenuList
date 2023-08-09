export default defineAppConfig({
  ui: {
    table: {
      wrapper: "relative overscroll-x-contain w-full overflow-x-auto",
      base: "min-w-full table-fixed",
      divide: "divide-y divide-gray-300 dark:divide-gray-700",
      thead: "bg-slate-50 dark:bg-slate-900",
      tbody: "divide-y divide-gray-200 dark:divide-gray-800",
      tr: {
        base: "last-of-type:bg-gray-100/50 last-of-type:dark:bg-gray-700/50 even:bg-slate-100 even:dark:bg-slate-800",
        selected: "bg-gray-50 dark:bg-gray-800/50",
      },
      th: {
        base: "text-left rtl:text-right",
        padding: "px-3 py-3.5",
        color: "text-gray-900 dark:text-white",
        font: "font-semibold",
        size: "text-sm",
      },
      td: {
        base: "whitespace-nowrap",
        padding: "px-3 py-4",
        color: "text-gray-500 dark:text-gray-400",
        font: "",
        size: "text-sm",
      },
      loadingState: {
        wrapper:
          "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        label: "text-sm text-center text-gray-900 dark:text-white",
        icon: "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin",
      },
      emptyState: {
        wrapper:
          "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        label: "text-sm text-center text-gray-900 dark:text-white",
        icon: "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4",
      },
      default: {
        sortAscIcon: "i-heroicons-bars-arrow-up-20-solid",
        sortDescIcon: "i-heroicons-bars-arrow-down-20-solid",
        sortButton: {
          icon: "i-heroicons-arrows-up-down-20-solid",
          trailing: true,
          square: true,
          color: "gray",
          variant: "ghost",
          class: "-m-1.5",
        },
        loadingState: {
          icon: "i-heroicons-arrow-path-20-solid",
          label: "Loading...",
        },
        emptyState: {
          icon: "i-heroicons-circle-stack-20-solid",
          label: "No items.",
        },
      },
    },
    modal: {
      wrapper: "relative z-50",
      inner: "fixed inset-0 overflow-y-auto",
      container:
        "flex min-h-full items-center sm:items-center justify-center text-center",
      padding: "p-4 sm:p-0",
      base: "relative text-left rtl:text-right overflow-hidden sm:my-8 w-full flex flex-col",
      overlay: {
        base: "fixed inset-0 transition-opacity",
        background: "bg-gray-200/75 dark:bg-gray-800/75",
        transition: {
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
        },
      },
      background: "bg-white dark:bg-gray-900",
      ring: "",
      rounded: "rounded-lg",
      shadow: "shadow-xl",
      width: "sm:max-w-lg",
      height: "",
      transition: {
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
      },
    },
  },
});

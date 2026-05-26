
export const navbarStyles = {
  container: "flex items-center gap-1 px-5 h-[54px] border-b border-[#eee] bg-white",
  navBtn: (mbaOpen) => `
    bg-transparent border-none border-b-2 cursor-pointer text-[14px] px-[14px] h-[54px] flex items-center \
    gap-1.5 transition-[color,border-color] duration-150 font-inherit
    ${mbaOpen ? "border-[#534AB7] text-[#534AB7]" : "border-transparent text-[#555]"}
  `.trim()
};

export const brandStyles = {
  // ... your other styles
  brand: "text-[15px] font-semibold text-[#1a1a1a] mr-6 tracking-[-0.3px]"
};

export const dropdownStyles = {
  // ... your other styles
  dropdownContainer: "absolute top-full left-0 bg-white border border-[#eee] rounded-[10px] min-w-[180px]\
   z-[200] shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1.5",

   dropdownItem: (isActive, semId) => `
    w-full border-none cursor-pointer text-[13px] px-4 py-[9px] flex justify-between items-center font-inherit\
     transition-colors duration-100 text-left hover:bg-gray-50
    ${isActive===semId ? "bg-[#f5f4fe] text-[#534AB7]" : "bg-transparent text-[#333]"}
  `.trim()
};

export const flyoutStyles = {
  // ... your other styles
  flyout: "absolute top-0 left-full bg-white border border-[#eee] rounded-[10px] min-w-[210px] z-[201]\
   shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1.5",
  flyoutItem: "w-full bg-transparent border-none cursor-pointer px-4 py-[9px] flex flex-col items-start\
   gap-0.5 font-inherit transition-colors duration-100 hover:bg-gray-50"
};

export const courseStyles = {
  courseHeader: "flex items-center gap-2.5 mb-2",
  courseCode: "text-[11px] bg-[#f0effe] text-[#534AB7] px-2.5 py-[3px] rounded-[6px] font-semibold tracking-[0.3px]",
  courseSem: "text-[12px] text-[#999]",
  courseTitle: "text-[20px] font-semibold text-[#1a1a1a] mb-1",
  courseSub: "text-[13px] text-[#888] mb-5"
};

export const resourceStyles = {
  resourceGrid: "grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3",
  resourceCard: "bg-[#fafafa] border border-[#e2e0e0] rounded-[10px] px-[14px] py-4 flex flex-col items-start\
   gap-1.5 cursor-pointer transition-colors duration-150 font-inherit text-left hover:border-gray-400",
  resourceIcon: "text-[22px]",
  resourceLabel: "text-[13px] font-semibold text-[#1a1a1a]",
  resourceCount: "text-[12px] text-[#999]"
};

export const breadcrumbStyles = {
  breadcrumb: "flex items-center flex-wrap gap-1 px-5 py-2 bg-[#f9f9f9] border-b border-[#eee] text-[12px]",
  breadcrumbItem: "flex items-center gap-1",
  breadcrumbSep: "text-[#ccc] mx-[2px]",
  breadcrumbMuted: "text-[#999]",
  breadcrumbActive: "text-[#1a1a1a] font-medium",
  breadcrumbHide: "overflow-hidden w-full h-0 py-0 px-5 border-b-0"
};

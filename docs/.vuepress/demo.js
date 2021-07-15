// @index(['../../src/**/__demo__/*.vue'], (f, _) => `export { default as ${_.pascalCase('demo_'+f.path.replace(/(^.+?\/components\/|__demo__)/g, ''))} } from '${f.path}';`)
export { default as DemoButtonColor } from '../../src/components/button/__demo__/color';
export { default as DemoButtonDisabled } from '../../src/components/button/__demo__/disabled';
export { default as DemoButtonPrimary } from '../../src/components/button/__demo__/primary';
export { default as DemoButtonSecondary } from '../../src/components/button/__demo__/secondary';
export { default as DemoButtonSize } from '../../src/components/button/__demo__/size';
export { default as DemoIconBasic } from '../../src/components/icon/__demo__/basic';
export { default as DemoNoticeBarBasic } from '../../src/components/notice_bar/__demo__/basic';
export { default as DemoLoadingBasic } from '../../src/components/loading/__demo__/basic';
export { default as DemoLoadingCustomColor } from '../../src/components/loading/__demo__/custom_color';
export { default as DemoLoadingCustomSize } from '../../src/components/loading/__demo__/custom_size';
export { default as DemoLoadingCustomTextColor } from '../../src/components/loading/__demo__/custom_text_color';
export { default as DemoLoadingDirection } from '../../src/components/loading/__demo__/direction';
export { default as DemoLoadingText } from '../../src/components/loading/__demo__/text';
export { default as DemoNotifyBasic } from '../../src/components/notify/__demo__/basic';
export { default as DemoNotifyDuration } from '../../src/components/notify/__demo__/duration';
export { default as DemoNotifyType } from '../../src/components/notify/__demo__/type';
export { default as DemoNumberKeyboardDef } from '../../src/components/number_keyboard/__demo__/def';
export { default as DemoPopupBasic } from '../../src/components/popup/__demo__/basic';
export { default as DemoPopupCustomTransition } from '../../src/components/popup/__demo__/custom_transition';
export { default as DemoPopupDrawer } from '../../src/components/popup/__demo__/drawer';
export { default as DemoPopupNoMask } from '../../src/components/popup/__demo__/no_mask';
export { default as DemoPopupTransparentMask } from '../../src/components/popup/__demo__/transparent_mask';
export { default as DemoSearchBackground } from '../../src/components/search/__demo__/background';
export { default as DemoSearchBasic } from '../../src/components/search/__demo__/basic';
export { default as DemoSearchCenter } from '../../src/components/search/__demo__/center';
export { default as DemoSearchRightContent } from '../../src/components/search/__demo__/right_content';
export { default as DemoSearchRound } from '../../src/components/search/__demo__/round';
// @endindex

// @index(['../**/*.vue', '!**/.*/**'], (f, _) => `export { default as ${_.pascalCase('demo_docs_'+f.path)} } from '${f.path}';`)
export { default as DemoDocsGuideTool } from '../guide/tool';
export { default as DemoDocsGuideUsage } from '../guide/usage';
// @endindex

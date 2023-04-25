const toButton = (button) => {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;

  return `
    <button
      class="button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <span class="material-icons" ${meta}>
        ${button.icon}
      </span>
    </button>
  `;
};

export const createToolbar = (state) => {
  const fontWeightState = state['fontWeight'] === 'bold' ? 'normal' : 'bold';
  const isFontWeightActive = state['fontWeight'] === 'bold';

  const fontStyleState = state['fontStyle'] === 'italic' ? 'normal' : 'italic';
  const isFontStyleActive = state['fontStyle'] === 'italic';

  const textDecorationState = state['textDecoration'] === 'underline'
    ? 'none'
    : 'underline';
  const isTextDecorationActive = state['textDecoration'] === 'underline';

  const buttons = [
    {
      icon: 'format_bold',
      active: isFontWeightActive,
      value: { fontWeight: fontWeightState },
    },
    {
      icon: 'format_italic',
      active: isFontStyleActive,
      value: { fontStyle: fontStyleState },
    },
    {
      icon: 'format_underlined',
      active: isTextDecorationActive,
      value: { textDecoration: textDecorationState },
    },
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
  ];

  return buttons.map(toButton).join('');
};

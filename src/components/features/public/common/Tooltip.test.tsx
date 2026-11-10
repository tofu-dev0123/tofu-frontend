import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '@/components/features/public/common/Tooltip';

const hoverTooltip = async (ui: React.ReactElement) => {
  const user = userEvent.setup();
  render(ui);
  await user.hover(screen.getByText('対象'));
  return screen.findByRole('tooltip');
};

describe('Tooltip', () => {
  it('top は下に余白をあけて表示する', async () => {
    const tooltip = await hoverTooltip(
      <Tooltip content="説明">
        <button>対象</button>
      </Tooltip>
    );
    expect(tooltip).toHaveStyle({ marginBottom: '8px' });
  });

  it('bottom は上に余白をあけて表示する', async () => {
    const tooltip = await hoverTooltip(
      <Tooltip content="説明" placement="bottom">
        <button>対象</button>
      </Tooltip>
    );
    expect(tooltip).toHaveStyle({ marginTop: '8px' });
  });

  it('left は右に余白をあけて表示する', async () => {
    const tooltip = await hoverTooltip(
      <Tooltip content="説明" placement="left">
        <button>対象</button>
      </Tooltip>
    );
    expect(tooltip).toHaveStyle({ marginRight: '8px' });
  });

  it('right は左に余白をあけて表示する', async () => {
    const tooltip = await hoverTooltip(
      <Tooltip content="説明" placement="right">
        <button>対象</button>
      </Tooltip>
    );
    expect(tooltip).toHaveStyle({ marginLeft: '8px' });
  });

  it('offset を指定するとその値の余白で表示する', async () => {
    const tooltip = await hoverTooltip(
      <Tooltip content="説明" offset={12}>
        <button>対象</button>
      </Tooltip>
    );
    expect(tooltip).toHaveStyle({ marginBottom: '12px' });
  });
});

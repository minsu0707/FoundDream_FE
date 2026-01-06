import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemForm from './ItemForm';

describe('ItemForm', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('제목이 비어있으면 "제목은 필수입니다" 에러를 표시한다', async () => {
    render(<ItemForm onSubmit={mockSubmit} submitLabel="등록하기" />);

    // 제목을 비운 채로 폼 제출
    const submitButton = screen.getByRole('button', { name: '등록하기' });
    fireEvent.click(submitButton);

    // 에러 메시지 확인
    expect(await screen.findByText('제목은 필수입니다')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('제목이 2자 미만이면 에러를 표시한다', async () => {
    render(<ItemForm onSubmit={mockSubmit} submitLabel="등록하기" />);

    const titleInput = screen.getByLabelText(/제목/);
    await userEvent.type(titleInput, '가');

    const submitButton = screen.getByRole('button', { name: '등록하기' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('제목은 최소 2자 이상이어야 합니다')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('설명이 비어있으면 에러를 표시한다', async () => {
    render(<ItemForm onSubmit={mockSubmit} submitLabel="등록하기" />);

    const titleInput = screen.getByLabelText(/제목/);
    await userEvent.type(titleInput, '검정 지갑 찾습니다');

    const submitButton = screen.getByRole('button', { name: '등록하기' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('설명은 필수입니다')).toBeInTheDocument();
  });

  it('장소를 선택하지 않으면 에러를 표시한다', async () => {
    render(<ItemForm onSubmit={mockSubmit} submitLabel="등록하기" />);

    const titleInput = screen.getByLabelText(/제목/);
    const descInput = screen.getByLabelText(/설명/);

    await userEvent.type(titleInput, '검정 지갑 찾습니다');
    await userEvent.type(descInput, '도서관에서 분실한 검정색 가죽 지갑입니다');

    const submitButton = screen.getByRole('button', { name: '등록하기' });
    fireEvent.click(submitButton);

    expect(await screen.findByText('장소를 선택해주세요')).toBeInTheDocument();
  });

  it('모든 필수 필드를 입력하면 폼이 제출된다', async () => {
    render(<ItemForm onSubmit={mockSubmit} submitLabel="등록하기" />);

    const titleInput = screen.getByLabelText(/제목/);
    const descInput = screen.getByLabelText(/설명/);
    const placeSelect = screen.getByLabelText(/장소/);
    const lostAtInput = screen.getByLabelText(/분실일/);

    await userEvent.type(titleInput, '검정 지갑 찾습니다');
    await userEvent.type(descInput, '도서관에서 분실한 검정색 가죽 지갑입니다');
    await userEvent.selectOptions(placeSelect, '도서관');
    await userEvent.type(lostAtInput, '2024-01-15');

    const submitButton = screen.getByRole('button', { name: '등록하기' });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: '검정 지갑 찾습니다',
        description: '도서관에서 분실한 검정색 가죽 지갑입니다',
        place: '도서관',
        status: 'OPEN',
      })
    );
  });
});

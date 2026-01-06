import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

describe("Filter", () => {
  const defaultProps = {
    status: "",
    place: "",
    search: "",
    onStatusChange: vi.fn(),
    onPlaceChange: vi.fn(),
    onSearchChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('상태 필터를 "찾는중"으로 선택하면 onStatusChange가 OPEN으로 호출된다', async () => {
    const onStatusChange = vi.fn();
    render(<Filter {...defaultProps} onStatusChange={onStatusChange} />);

    const statusSelect = screen.getByTestId("status-filter");
    await userEvent.selectOptions(statusSelect, "OPEN");

    expect(onStatusChange).toHaveBeenCalledWith("OPEN");
  });

  it('상태 필터를 "해결됨"으로 선택하면 onStatusChange가 RESOLVED로 호출된다', async () => {
    const onStatusChange = vi.fn();
    render(<Filter {...defaultProps} onStatusChange={onStatusChange} />);

    const statusSelect = screen.getByTestId("status-filter");
    await userEvent.selectOptions(statusSelect, "RESOLVED");

    expect(onStatusChange).toHaveBeenCalledWith("RESOLVED");
  });

  it("장소 필터를 선택하면 onPlaceChange가 호출된다", async () => {
    const onPlaceChange = vi.fn();
    render(<Filter {...defaultProps} onPlaceChange={onPlaceChange} />);

    const placeSelect = screen.getByLabelText(/장소/);
    await userEvent.selectOptions(placeSelect, "도서관");

    expect(onPlaceChange).toHaveBeenCalledWith("도서관");
  });

  it("검색어를 입력하면 onSearchChange가 호출된다", async () => {
    const onSearchChange = vi.fn();
    render(<Filter {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByLabelText(/검색/);
    fireEvent.change(searchInput, { target: { value: "wallet" } });

    expect(onSearchChange).toHaveBeenCalledWith("wallet");
  });

  it("현재 선택된 필터 값이 표시된다", () => {
    render(
      <Filter
        {...defaultProps}
        status="RESOLVED"
        place="도서관"
        search="우산"
      />
    );

    const statusSelect = screen.getByTestId(
      "status-filter"
    ) as HTMLSelectElement;
    const placeSelect = screen.getByLabelText(/장소/) as HTMLSelectElement;
    const searchInput = screen.getByLabelText(/검색/) as HTMLInputElement;

    expect(statusSelect.value).toBe("RESOLVED");
    expect(placeSelect.value).toBe("도서관");
    expect(searchInput.value).toBe("우산");
  });
});

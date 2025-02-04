import { useEffect, useState } from "react";

import "./select-option.css";

export interface SelectOptionProps {
    label?: string;
    placeholder?: string;
    multiple: boolean;
    outlined: boolean;
    withSearch: boolean;
    id: string;
    optionLabel: string;
    options?: Array<object>;
    onChange?: () => void;
}

const SelectOption = ({
    label,
    placeholder = "Select Option",
    id = "value",
    optionLabel = "text",
    multiple = false,
    outlined = true,
    withSearch = false,
    options = [],
    ...props
}: SelectOptionProps) => {
    const [open, setOpen] = useState(Boolean);
    const [inputSearch, setInputSearch] = useState(String);
    const [resultOption, setResultOption] = useState(Array);
    const [selected, setSelected]: any = useState(null);

    const removeSelectedHandler = (value: any) => {
        const result = selected.filter((v: any) => {
            return v[id] != value[id];
        });

        setSelected(result);
    };

    const selectMultipleHandler = (val: any) => {
        const selectedResult = selected || [];
        const existData = selectedResult.find((v: any) => val[id] == v[id]);

        if (!existData) {
            selectedResult.push(val);
            setSelected(selectedResult);
        }
    };

    const selectValueHandler = (val: any) => {
        if (multiple) {
            selectMultipleHandler(val);
        } else {
            setSelected(val);
        }

        closeHandler();
    };

    const changeInputSearch = (value: string) => {
        setInputSearch(value);

        const regexp = new RegExp(value, "gi");

        const result = options
            .filter((val: any) => {
                return val[optionLabel].match(regexp);
            })
            .map((val: any) => {
                return {
                    ...val,
                };
            });

        setResultOption(result);
    };

    const clearInputSearch = (e: any) => {
        e.stopPropagation();

        setInputSearch("");
        setResultOption(options);
    };

    const clickSelectHandler = (e: any) => {
        e.preventDefault();

        setOpen(true);
        setTimeout(() => {
            document.addEventListener("click", hideListMenu);
        }, 100);
    };

    const closeHandler = () => {
        setOpen(false);
        setTimeout(() => {
            document.removeEventListener("click", hideListMenu);
        }, 100);
        console.log("this case");
    };

    const hideListMenu = (e: any) => {
        e.preventDefault();

        const { target } = e;

        const container = document.querySelector(".select-input--wrapper");

        if (container && container.contains(target)) return;

        closeHandler();
    };

    useEffect(() => {
        setResultOption(options);
    }, []);

    useEffect(() => {
        setSelected(null);
        setResultOption(options);
        setInputSearch("");
    }, [multiple]);

    return (
        <div {...props} className="select-container">
            {label && <span className="select-label">{label}</span>}

            <section className="select-input--wrapper">
                <label
                    className={`select-input--container ${
                        outlined ? "outlined" : ""
                    }`}
                    onClick={clickSelectHandler}
                >
                    {!selected && (
                        <div className="select-value option-placeholder">
                            {placeholder}
                        </div>
                    )}

                    {multiple
                        ? Array.isArray(selected) && (
                              <div className="select-value">
                                  {selected.map((v: any) => {
                                      return (
                                          <span>
                                              {v?.[optionLabel]}
                                              <svg
                                                  onClick={() =>
                                                      removeSelectedHandler(v)
                                                  }
                                                  className="close-button"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path
                                                      fill="currentColor"
                                                      d="m8.054 16.673l-.727-.727L11.273 12L7.327 8.079l.727-.727L12 11.298l3.921-3.946l.727.727L12.702 12l3.946 3.946l-.727.727L12 12.727z"
                                                  />
                                              </svg>
                                          </span>
                                      );
                                  })}
                              </div>
                          )
                        : selected &&
                          !Array.isArray(selected) && (
                              <div className="select-value">
                                  {selected?.[optionLabel] || selected}
                              </div>
                          )}

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M12 14.379q-.162 0-.298-.053q-.137-.053-.267-.184L7.046 9.754q-.14-.14-.15-.344q-.01-.204.15-.364t.354-.16q.194 0 .354.16L12 13.292l4.246-4.246q.14-.14.344-.15q.204-.01.364.15t.16.354q0 .194-.16.354l-4.389 4.388q-.13.131-.267.184q-.136.053-.298.053"
                        />
                    </svg>
                </label>

                {open && (
                    <div className="option-list--container">
                        {withSearch && (
                            <div className="input-search--wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <circle cx="11.5" cy="11.5" r="9.5" />
                                        <path
                                            strokeLinecap="round"
                                            d="M18.5 18.5L22 22"
                                        />
                                    </g>
                                </svg>
                                <input
                                    className="select-input--search"
                                    value={inputSearch}
                                    onChange={(e) =>
                                        changeInputSearch(e.target.value)
                                    }
                                />
                                {inputSearch && (
                                    <svg
                                        className="close-button"
                                        onClick={clearInputSearch}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
                                        />
                                    </svg>
                                )}
                            </div>
                        )}

                        <div className="input-list--wrapper">
                            {resultOption.map((v: any, i: number) => {
                                return (
                                    <div
                                        key={i}
                                        className="list"
                                        onClick={() => selectValueHandler(v)}
                                        dangerouslySetInnerHTML={{
                                            __html: v[optionLabel] || "-",
                                        }}
                                    ></div>
                                );
                            })}

                            {!resultOption?.length && (
                                <p className="list-nodata">No data found.</p>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SelectOption;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import BarcodeScanner from "./components/BarcodeScanner";
import AdvancedFilters from "./components/AdvancedFilters";
import { useRef, useState } from "react";
import ProductDetail from "./pages/ProductDetail";
import SortDropdown from "./components/SortDropdown";
import {
  Button,
  Col,
  Collapse,
  Form,
  Popover,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
const { Title } = Typography;
const { Panel } = Collapse;
// Create a query client
const queryClient = new QueryClient();

function App() {
  const formRef = useRef();
  const [closeFilter, setCloseFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("name");
  const [filters, setFilters] = useState({
    categories: [],
    maxSugar: 10,
    minProtein: 0,
    sortBy: "name_asc",
  });
  const [sortOption, setSortOption] = useState("name_asc");
  const resetFilters = () => {
    setFilters({
      categories: [],
      maxSugar: 10,
      minProtein: 0,
      sortBy: "name_asc",
    });
    setSortOption("name_asc");
  };

  const FilterBox = (
    <>
      <Form ref={formRef}>
        <Collapse
          defaultActiveKey={["1"]}
          style={{ width: "300px", padding: 0 }}
        >
          <Panel header="Categories" key="Categories">
            <AdvancedFilters filters={filters} setFilters={setFilters} />
          </Panel>
          <Panel header="Sort By" key="sort_by">
            <SortDropdown
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </Panel>
        </Collapse>
      </Form>
    </>
  );
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Row style={{ margin: "16px" }}>
                      <Col
                        lg={6}
                        xl={6}
                        md={12}
                        sm={18}
                        style={{ display: "flex", justifyContent: "start" }}
                      >
                        <Title
                          level={3}
                          style={{ marginTop: "13px", color: "grey" }}
                        >
                          View Products
                        </Title>
                      </Col>
                      <Col
                        xl={18}
                        lg={18}
                        md={20}
                        sm={24}
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <Space>
                          <div style={{ marginRight: "10px" }}>
                            <SearchBar onSearch={setSearchTerm} />
                          </div>
                          <div style={{ marginRight: "10px" }}>
                            <Tooltip title="Filters">
                              <Popover
                                style={{ marginRight: "10px"}}
                                placement="bottomLeft"
                                title={
                                  <div>
                                    <Row style={{ display: "flex" }}>
                                      {" "}
                                      <Col
                                        span={10}
                                        style={{ marginTop: "4px" }}
                                      >
                                        Filter
                                      </Col>{" "}
                                      <Col
                                        span={14}
                                        style={{
                                          color: "#31A6C7",
                                          textAlign: "end",
                                        }}
                                      >
                                        <Button
                                          type="link"
                                          onClick={() => resetFilters()}
                                        >
                                          Reset
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                }
                                content={FilterBox}
                                trigger="hover"
                                onOpenChange={() =>
                                  !closeFilter
                                    ? setCloseFilter(true)
                                    : setCloseFilter(false)
                                }
                                open={closeFilter}
                              >
                                <Button
                                  style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    border: 0,
                                    borderRadius: "5px",
                                    backgroundColor: "grey",
                                    color: "white",
                                  }}
                                >
                                  <FilterOutlined /> Filter
                                </Button>
                              </Popover>
                            </Tooltip>
                          </div>
                        </Space>
                      </Col>
                    </Row>

                    <div style={{ margin: "0px 16px 10px" }}>
                      <BarcodeScanner />
                    </div>
                    <ProductList
                      searchTerm={searchTerm}
                      filters={filters}
                      sortOption={sortOption}
                    />
                  </>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>

            <footer className="bg-blue-200 dark:bg-gray-700 p-4 text-center">
              <p>Powered by OpenFoodFacts API</p>
            </footer>
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

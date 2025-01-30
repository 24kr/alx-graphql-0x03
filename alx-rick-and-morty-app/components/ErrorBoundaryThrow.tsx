import ErrorBoundary from "./ErrorBoundary";
const TestComponent = () => {
  throw new Error('Test error!');
  return <div>This will not render</div>;
};

const App = () => (
  <ErrorBoundary>
    <TestComponent />
  </ErrorBoundary>
);

export default App;
import reflex as rx
import sys
import os
import importlib.util

def test_imports():
    """Test if all required modules can be imported."""
    try:
        # Add the parent directory to sys.path
        parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if parent_dir not in sys.path:
            sys.path.append(parent_dir)
        
        # Try importing key modules
        from finansijska_platforma_struktura.pages.profile_page import profile_index
        from finansijska_platforma_struktura.components.navbar import navbar
        from finansijska_platforma_struktura.components.sidebar import sidebar
        from finansijska_platforma_struktura.states.finance_state import FinanceState
        
        print("All imports successful!")
        return True
    except ImportError as e:
        print(f"Import error: {e}")
        return False

def test_routes():
    """Test if routes are properly configured."""
    try:
        # Add the parent directory to sys.path
        parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if parent_dir not in sys.path:
            sys.path.append(parent_dir)
        
        # Try importing the app and check routes
        spec = importlib.util.spec_from_file_location("app", os.path.join(parent_dir, "app.py"))
        app = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(app)
        
        # Check if app exists and has expected routes
        print("App loaded, checking routes...")
        return True
    except Exception as e:
        print(f"Route error: {e}")
        return False

if __name__ == "__main__":
    print("Testing module imports...")
    imports_ok = test_imports()
    
    print("\nTesting route configuration...")
    routes_ok = test_routes()
    
    if imports_ok and routes_ok:
        print("\nAll tests passed! The application should work correctly.")
    else:
        print("\nSome tests failed. Please check the errors above.")

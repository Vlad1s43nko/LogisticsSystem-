#!/usr/bin/env python3
"""
Logistics Management System - Desktop Application
Corrected for direct templates/ and static/ folders
"""

import os
import sys
import threading
import time
import socket
import webbrowser
from contextlib import closing
from flask import Flask, render_template, send_from_directory

# Desktop functionality (only import if available)
try:
    import webview
    DESKTOP_MODE = True
except ImportError:
    DESKTOP_MODE = False
    print("PyWebView not installed. Running in web mode.")

# Build functionality (only import if available) - UPDATED TO NUITKA
try:
    import nuitka
    BUILD_MODE = True
except ImportError:
    BUILD_MODE = False

class LogisticsApp:
    def __init__(self):
        # Get the directory where this script is located
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Set template and static folders to the current directory
        self.app = Flask(__name__, 
                        template_folder=os.path.join(script_dir, 'templates'),
                        static_folder=os.path.join(script_dir, 'static'))
        
        self.flask_port = self.find_free_port()
        self.flask_thread = None
        self.script_dir = script_dir
        self.setup_routes()
        
    def find_free_port(self):
        """Find a free port for Flask"""
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as s:
            s.bind(('', 0))
            s.listen(1)
            port = s.getsockname()[1]
        return port
    
    def setup_routes(self):
        """Setup all Flask routes"""
        
        @self.app.route('/')
        def dashboard():
            return render_template('dashboard.html')

        @self.app.route('/trucks')
        def trucks_list():
            return render_template('trucks_list.html')

        @self.app.route('/truck/<truck_id>')
        def truck_detail(truck_id):
            return render_template('truck_detail.html', truck_id=truck_id)

        @self.app.route('/drivers')
        def drivers_list():
            return render_template('drivers_list.html')

        @self.app.route('/driver/<driver_id>')
        def driver_detail(driver_id):
            return render_template('driver_detail.html', driver_id=driver_id)

        @self.app.route('/trips')
        def trips_list():
            return render_template('trips_list.html')

        @self.app.route('/trip/<trip_id>')
        def trip_detail(trip_id):
            return render_template('trip_detail.html', trip_id=trip_id)

        # Serve static files
        @self.app.route('/static/img/<path:filename>')
        def serve_image(filename):
            return send_from_directory(
                os.path.join(self.app.static_folder, 'img'), 
                filename
            )
    
    def create_placeholder_files(self):
        """Create placeholder image files if they don't exist"""
        img_dir = os.path.join(self.app.static_folder, 'img')
        if not os.path.exists(img_dir):
            os.makedirs(img_dir)
        
        truck_placeholder = os.path.join(img_dir, 'truck-placeholder.png')
        driver_placeholder = os.path.join(img_dir, 'driver-placeholder.jpg')
        
        if not os.path.exists(truck_placeholder):
            with open(truck_placeholder, 'w') as f:
                f.write('''<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
                    <rect width="200" height="100" fill="#ddd"/>
                    <text x="40" y="50" font-family="Arial" font-size="14" fill="#555">Truck Placeholder</text>
                </svg>''')
        
        if not os.path.exists(driver_placeholder):
            with open(driver_placeholder, 'w') as f:
                f.write('''<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="#ddd"/>
                    <text x="35" y="100" font-family="Arial" font-size="14" fill="#555">Driver Placeholder</text>
                </svg>''')
    
    def start_flask_server(self):
        """Start Flask server in background thread"""
        self.create_placeholder_files()
        self.app.run(
            host='127.0.0.1', 
            port=self.flask_port, 
            debug=False, 
            use_reloader=False,
            threaded=True
        )
    
    def run_web_mode(self):
        """Run in web browser mode"""
        print(f"Starting Logistics Management System...")
        print(f"Server running on http://127.0.0.1:{self.flask_port}")
        print("Press Ctrl+C to stop")
        
        # Start Flask
        self.flask_thread = threading.Thread(target=self.start_flask_server, daemon=True)
        self.flask_thread.start()
        
        # Wait a moment then open browser
        time.sleep(2)
        webbrowser.open(f'http://127.0.0.1:{self.flask_port}')
        
        try:
            # Keep main thread alive
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nShutting down...")
            sys.exit(0)
    
    def run_desktop_mode(self):
        """Run in desktop mode with PyWebView"""
        if not DESKTOP_MODE:
            print("PyWebView not available. Install with: pip install pywebview")
            return self.run_web_mode()
        
        print("Starting Logistics Management System (Desktop Mode)...")
        
        # Start Flask in background
        self.flask_thread = threading.Thread(target=self.start_flask_server, daemon=True)
        self.flask_thread.start()
        
        # Wait for Flask to start
        time.sleep(3)
        
        # Create desktop window
        window = webview.create_window(
            title='Logistics Management System',
            url=f'http://127.0.0.1:{self.flask_port}',
            width=1400,
            height=900,
            min_size=(1200, 800),
            resizable=True,
            maximized=False,
            on_top=False
        )
        
        # Start the webview
        webview.start(debug=False)
    
    def build_executable(self):
        """Build the desktop executable with Nuitka (COMPLETELY UPDATED)"""
        try:
            import nuitka
        except ImportError:
            print("Nuitka not available. Install with: pip install nuitka")
            return
        
        print("Building desktop executable with Nuitka...")
        
        # Check for templates and static folders in current directory
        templates_folder = os.path.join(self.script_dir, 'templates')
        static_folder = os.path.join(self.script_dir, 'static')
        
        print(f"Looking for folders in: {self.script_dir}")
        
        if not os.path.exists(templates_folder):
            print(f"ERROR: 'templates' folder not found at {templates_folder}")
            return
            
        if not os.path.exists(static_folder):
            print(f"ERROR: 'static' folder not found at {static_folder}")
            return
        
        print(f"✓ Found templates: {templates_folder}")
        print(f"✓ Found static: {static_folder}")
        
        # Build command for Nuitka
        cmd = [
            sys.executable, "-m", "nuitka",
            "--onefile",                    # Create single executable
            "--enable-plugin=tk-inter",     # Enable tkinter (webview dependency)
            "--enable-plugin=multiprocessing",  # Enable multiprocessing
            f"--include-data-dir={templates_folder}=templates",  # Include templates
            f"--include-data-dir={static_folder}=static",        # Include static files
            "--output-dir=dist",                                 # Output directory
            __file__                                             # Input file
        ]
        
        # Platform-specific settings
        if sys.platform == 'win32':
            # Windows settings
            cmd.extend([
                "--windows-disable-console",    # No console window
                "--output-filename=LogisticsSystem.exe",
            ])
            
            # Add icon if available
            icon_path = os.path.join(self.script_dir, 'icon.ico')
            if os.path.exists(icon_path):
                cmd.append(f"--windows-icon-from-ico={icon_path}")
                
        elif sys.platform == 'darwin':
            # macOS settings
            cmd.extend([
                "--macos-create-app-bundle",     # Create .app bundle
                "--output-filename=LogisticsSystem",
            ])
            
            # Add icon if available
            icon_path = os.path.join(self.script_dir, 'icon.icns')
            if os.path.exists(icon_path):
                cmd.append(f"--macos-app-icon={icon_path}")
                
        else:
            # Linux settings
            cmd.extend([
                "--output-filename=LogisticsSystem",
            ])
        
        try:
            print("Starting Nuitka compilation...")
            print("This may take several minutes...")
            print(f"Platform: {sys.platform}")
            
            import subprocess
            result = subprocess.run(cmd, cwd=self.script_dir, capture_output=True, text=True)
            
            if result.returncode == 0:
                print("\n" + "="*50)
                print("BUILD COMPLETE!")
                print("="*50)
                
                # Platform-specific output paths
                if sys.platform == 'win32':
                    executable_path = os.path.join(self.script_dir, 'dist', 'LogisticsSystem.exe')
                    app_type = "Windows executable (.exe)"
                elif sys.platform == 'darwin':
                    executable_path = os.path.join(self.script_dir, 'dist', 'LogisticsSystem.app')
                    app_type = "macOS application bundle (.app)"
                else:
                    executable_path = os.path.join(self.script_dir, 'dist', 'LogisticsSystem')
                    app_type = "Linux executable"
                
                if os.path.exists(executable_path):
                    if sys.platform == 'darwin' and executable_path.endswith('.app'):
                        # For .app bundles, calculate the size of the entire bundle
                        total_size = sum(os.path.getsize(os.path.join(dirpath, filename))
                                       for dirpath, dirnames, filenames in os.walk(executable_path)
                                       for filename in filenames) / (1024*1024)
                    else:
                        total_size = os.path.getsize(executable_path) / (1024*1024)
                    
                    print(f"✓ {app_type} created: {executable_path}")
                    print(f"✓ File size: {total_size:.1f} MB")
                    print(f"\n🎉 Success! Your executable is ready!")
                    print(f"⚡ Nuitka executables are typically faster than PyInstaller!")
                    
                else:
                    print("Build completed but executable not found at expected location.")
                    
            else:
                print("✗ Build failed!")
                print("STDOUT:", result.stdout)
                print("STDERR:", result.stderr)
                self.print_build_troubleshooting()
            
        except Exception as e:
            print(f"Build failed: {e}")
            self.print_build_troubleshooting()
    
    def print_build_troubleshooting(self):
        """Print platform-specific troubleshooting info"""
        print("\nTroubleshooting:")
        
        if sys.platform == 'win32':
            print("Windows:")
            print("1. Install Visual Studio Build Tools")
            print("2. Try: pip install --upgrade nuitka")
            print("3. Run as Administrator")
            
        elif sys.platform == 'darwin':
            print("macOS:")
            print("1. Install Xcode Command Line Tools: xcode-select --install")
            print("2. Try: pip install --upgrade nuitka")
            print("3. Make sure you have admin permissions")
            
        else:
            print("Linux:")
            print("1. Install build essentials: sudo apt-get install build-essential")
            print("2. Try: pip install --upgrade nuitka")
            print("3. Install development packages for Python")

def main():
    """Main entry point"""
    app = LogisticsApp()
    
    # Check command line arguments
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == 'build':
            app.build_executable()
            return
        elif command == 'web':
            app.run_web_mode()
            return
        elif command == 'desktop':
            app.run_desktop_mode()
            return
        elif command == 'help':
            print_help()
            return
        else:
            print(f"Unknown command: {command}")
            print_help()
            return
    
    # Default behavior: try desktop mode, fallback to web
    if DESKTOP_MODE:
        app.run_desktop_mode()
    else:
        app.run_web_mode()

def print_help():
    """Print help information (UPDATED FOR NUITKA)"""
    print("""
Logistics Management System - Desktop Application

Current directory structure should be:
    Logistics_System/
    ├── app.py                    # ← This file
    ├── templates/                # ← Your templates folder
    │   ├── base.html
    │   ├── dashboard.html
    │   └── ...
    ├── static/                   # ← Your static folder
    │   ├── css/
    │   ├── js/
    │   └── img/
    └── dist/                     # ← Created after building

Usage:
    python app.py [command]

Commands:
    (no command)  - Run in desktop mode (default)
    desktop       - Run in desktop mode
    web          - Run in web browser mode
    build        - Build executable file
    help         - Show this help

Examples:
    python app.py                # Run desktop app
    python app.py web           # Run in browser
    python app.py build         # Build .exe/.app file

Requirements:
    - Base: flask
    - Desktop: pip install pywebview
    - Build: pip install nuitka
    
For building executables:
    Windows: Install Visual Studio Build Tools
    macOS: Install Xcode Command Line Tools  
    Linux: Install build-essential
    """)

if __name__ == '__main__':
    main()
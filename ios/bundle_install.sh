set -e

root_dir=$(pwd)
echo "root_dir: $root_dir"
command="pod install --verbose --repo-update"
project_name="LynxExplorer.xcodeproj"

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo " -h, --help         Show this help message"
    echo " --skip-card-build  Skip card build task"
    echo " --integration-test  Build integration test demo pages"
}

build_card_resources() {
    mkdir -p $root_dir/ios/LynxExplorer/Resource

    # build home page card
    yarn install
    yarn run build
    cp $root_dir/dist/main.lynx.bundle $root_dir/ios/LynxExplorer/Resource/homepage.lynx.bundle
}

handle_options() {
    for i in "$@"; do
        case $i in
            -h | --help)
                usage
                exit 0
                ;;
            --skip-card-build)
                SKIP_CARD_BUILD=true
                ;;
            --integration-test)
                INTEGRATION_TEST=true
                ;;
            *)
                usage
                exit 1
                ;;
        esac
    done
}

SKIP_CARD_BUILD=false
INTEGRATION_TEST=false

handle_options "$@"
build_card_resources

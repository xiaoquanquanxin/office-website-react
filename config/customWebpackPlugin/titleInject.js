//  注入title
const titleInjectFn = (outputName, html) => {
    let titlePlaceholder = '';
    let keywordsPlaceholder = '';
    let descriptionPlaceholder = '';

    let metaSiteName = '';
    let metaType = '';
    let metaUrl = '';
    let metaTitle = '';
    let metaDescription = '';
    let metaImage = '';
    switch (outputName) {
        case 'about.html':
            //  关于我们
            titlePlaceholder = '关于我们｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '关于我们｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/about.html';
            metaTitle = '关于我们｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news577381600761559.png';
            break;

        case 'adas.html':
            //  解决方案-智能驾驶-高级别辅助驾驶
            titlePlaceholder = '高级别辅助驾驶｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '高级别辅助驾驶｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/adas.html';
            metaTitle = '高级别辅助驾驶｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news687331600755143.png';
            break;

        case 'aiot.html':
            //  智能物联网
            titlePlaceholder = '智能物联网｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '智能物联网｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/aiot.html';
            metaTitle = '智能物联网｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news900421600761459.png';
            break;

        case 'autonomous-driving.html':
            //  解决方案-智能驾驶-自动驾驶
            titlePlaceholder = '自动驾驶｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '自动驾驶｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/autonomous-driving.html';
            metaTitle = '自动驾驶｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news806471600761266.png';
            break;

        case 'index.html':
            //  首页
            titlePlaceholder = '地平线｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '地平线｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/';
            metaTitle = '地平线｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news749441600743947.png';
            break;

        case 'intelligent-cockpit.html':
            //  解决方案-智能驾驶-智能座舱
            titlePlaceholder = '智能座舱｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '智能座舱｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/intelligent-cockpit.html';
            metaTitle = '智能座舱｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news658101600761347.png';
            break;

        case 'journey2.html':
            //  征程2
            titlePlaceholder = '征程2｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '征程2｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/journey2.html';
            metaTitle = '征程2｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news403991600754689.png';
            break;

        case 'journey3.html':
            //  征程3
            titlePlaceholder = '征程3｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '征程3｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/journey3.html';

            metaTitle = '征程3｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news713891600754612.png';
            break;

        case 'matrix.html':
            //  产品中心-MATRIX
            titlePlaceholder = 'MATRIX｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = 'MATRIX｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/matrix.html';
            metaTitle = 'MATRIX｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news403671600754922.png';

            break;

        case 'navinet.html':
            //  解决方案-智能驾驶-高精地图
            titlePlaceholder = '高精地图｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '高精地图｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/navinet.html';
            metaTitle = '高精地图｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news303131600761397.png';
            break;

        case 'news.html':
            //  新闻中心
            titlePlaceholder = '新闻中心｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '新闻中心｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/news.html';
            metaTitle = '新闻中心｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news198911600761508.png';
            break;

        case 'news-detail.html':
            //  新闻详情
            titlePlaceholder = '新闻详情';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            break;

        case 'open-explorer.html':
            //  产品中心-天工开物
            titlePlaceholder = '天工开物｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '天工开物｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/open-explorer.html';
            metaTitle = '天工开物｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news111471600755065.png';
            break;

        case 'sunrise2.html':
            //  产品中心-旭日 Sunrise-旭日2
            titlePlaceholder = '旭日2｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '旭日2｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/sunrise2.html';
            metaTitle = '旭日2｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news227651600754749.png';
            break;

        case 'sunrise3.html':
            //  产品中心-旭日 Sunrise-旭日3
            titlePlaceholder = '旭日3｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '旭日3｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/sunrise3.html';
            metaTitle = '旭日3｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news677931600754739.png';
            break;

        case 'technology.html':
            //  核心技术
            titlePlaceholder = '核心技术｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';

            metaSiteName = '核心技术｜边缘人工智能芯片全球领导者';
            metaType = 'website';
            metaUrl = 'https://www.horizon.ai/technology.html';
            metaTitle = '核心技术｜边缘人工智能芯片全球领导者';
            metaDescription = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            metaImage = '/upload/202009/22/news206011600746402.png';
            break;

        case '404.html':
            //  not found
            titlePlaceholder = 'Not Found';
            break;
        default:
            break;
    }

    //  替换html meta
    html = html.replace('[[[custom-title]]]', titlePlaceholder);
    html = html.replace('[[[custom-keywords]]]', keywordsPlaceholder);
    html = html.replace('[[[custom-description]]]', descriptionPlaceholder);

    html = html.replace('[[[custom-og-site_name]]]', metaSiteName);
    html = html.replace('[[[custom-og-type]]]', metaType);
    html = html.replace('[[[custom-og-url]]]', metaUrl);
    html = html.replace('[[[custom-og-title]]]', metaTitle);
    html = html.replace('[[[custom-og-description]]]', metaDescription);
    html = html.replace('[[[custom-og-image]]]', metaImage);
    //  console.log('输出🍉🍉', html);
    return html;
};
module.exports = titleInjectFn;
package com.palluxy.global.common.constant;

import java.util.Collections;
import java.util.List;

public final class CORS_SET {

    public static final List<String> ALLOWED_ORIGINS = Collections.singletonList("https://i11a208.p.ssafy.io");
    public static final List<String> ALLOWED_METHODS = Collections.singletonList("*");
    public static final List<String> ALLOWED_HEADERS = Collections.singletonList("*");
    public static final List<String> EXPOSED_HEADERS = Collections.singletonList("access");
    public static final Boolean ALLOWED_CREDENTIALS = true;

    // PREFLIGHT 요청을 지속 시간
    public static final Long MAX_AGE_1H = 3600L;

    private CORS_SET() {
    }
}

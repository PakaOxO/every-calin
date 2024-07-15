package com.everycalin.backend.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.everycalin.backend.entity.Holiday;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CollectHoliday {
	@Value("${holiday.api-key}")
	private String secretKey;

	public ArrayList<Holiday> getHolidayInfo(String year) throws Exception {
		Map<String, Object> holidayMap = holidayInfo(year);
		Map<String, Object> response = (Map<String, Object>)holidayMap.get("response");
		Map<String, Object> body = (Map<String, Object>)response.get("body");

		Map<String, Object> items = (Map<String, Object>)body.get("items");
		ArrayList<Map<String, Object>> item = (ArrayList<Map<String, Object>>)items.get("item");

		ArrayList<Holiday> result = new ArrayList<>();
		for (Map<String, Object> day : item) {
			String name = String.valueOf(day.get("dateName"));
			String date = dateFormatter(String.valueOf(day.get("locdate")));
			result.add(Holiday.builder()
				.name(name)
				.date(date)
				.build());
		}

		return result;
	}

	/**
	 * "yyyyMMdd" -> "yyyy-MM-dd" 변환
	 *
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	private String dateFormatter(String date) throws ParseException {
		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");

		Date formatDate = formatter1.parse(date);

		return formatter2.format(formatDate);
	}

	private Map<String, Object> holidayInfo(String year) throws IOException {
		StringBuilder urlBuilder = new StringBuilder(
			"http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"); /*URL*/
		urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + secretKey); /*Service Key*/
		// urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
		urlBuilder.append(
			"&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과 수*/
		urlBuilder.append("&" + URLEncoder.encode("solYear", "UTF-8") + "=" + URLEncoder.encode(year, "UTF-8")); /*연*/
		urlBuilder.append(
			"&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* json으로 요청 */

		URL url = new URL(urlBuilder.toString());
		// System.out.println("요청URL = " + urlBuilder);

		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		// System.out.println("Response code: " + conn.getResponseCode());

		BufferedReader rd;
		if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		} else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		StringBuilder sb = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			sb.append(line);
		}
		rd.close();
		conn.disconnect();
		// System.out.println(sb.toString());

		return string2Map(sb.toString());
	}

	/**
	 * Json String을 Hashmap으로 반환
	 *
	 * @param json
	 * @return
	 */
	private Map<String, Object> string2Map(String json) {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> map = null;

		try {
			map = mapper.readValue(json, Map.class);
			// System.out.println(map);

		} catch (IOException e) {
			e.printStackTrace();
		}

		return map;
	}
}

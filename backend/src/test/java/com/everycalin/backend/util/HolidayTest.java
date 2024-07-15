package com.everycalin.backend.util;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.everycalin.backend.entity.Holiday;

@SpringBootTest
public class HolidayTest {
	@Autowired
	private CollectHoliday holiday;

	@Test
	void 공휴일_가져오기() {
		try {
			ArrayList<Holiday> holidays = holiday.getHolidayInfo("2024");
			System.out.println("totalCount : " + holidays.size());
			for(Holiday h : holidays) {
				System.out.println(h.getName() + " : " + h.getDate());
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
}
